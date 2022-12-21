import {ApolloLink, createHttpLink, HttpOptions, InMemoryCache, Operation} from "@apollo/client";
import {ApolloClient, gql} from "@apollo/client/core";
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client";

import {AppConfig} from "../../AppConfig";
import * as Models from "../../models";
import {BaseGraphQLAPIClient, BaseGraphQLAPIClientContext, BaseGraphQLAPIResponse, BaseGraphQLRequestConfig, RequestMethod, RequestOptions} from "./BaseGraphQLAPIClient";
import {
  FetchUserRequest,
  FetchUserResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RequestResetPasswordRequest,
  RequestResetPasswordResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "./GraphQLAPIClient.types";
import {MutationRefreshTokensArgs, MutationRequestResetPasswordArgs, MutationSignInArgs, MutationSignUpArgs, MutationUpdateUserArgs} from "./GraphQLAPIClientSchema.types";

export type GraphQLAPIClientConfigureClientOptions = {
  userAgent: string;
  shouldRefreshToken: () => boolean;
  onRefreshToken: (accessToken: Models.AccessToken) => void;
};

export type GraphQLAPIClientGetHeadersOptions = {
  accessToken?: Models.AccessToken | undefined;
};

export type GraphQLAPIClientRequestConfig<TRequest, TRequestMethod extends RequestMethod> = Omit<BaseGraphQLRequestConfig<TRequest, TRequestMethod>, "headers" | "client"> & {
  headers?: GraphQLAPIClientGetHeadersOptions;
};

export class GraphQLAPIClient extends BaseGraphQLAPIClient {
  static client: ApolloClient<unknown>;
  static options: GraphQLAPIClientConfigureClientOptions;

  static configureClient(options: GraphQLAPIClientConfigureClientOptions) {
    this.options = options;

    const httpOptions = (operation: Operation): HttpOptions => {
      const context = operation.getContext() as BaseGraphQLAPIClientContext;

      return {
        uri: AppConfig.Settings.Server.graphql.apiClient.baseUrl,
        credentials: "same-origin",
        fetch: this.getCustomFetch(context.requestConfig),
      };
    };

    this.client = new ApolloClient({
      link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
          if (graphQLErrors) graphQLErrors.map(({message, locations, path}) => console.warn(`[GraphQL error]: Message: ${message}, Locations: ${locations}, Path: ${path}`));
          if (networkError) console.warn(`[Network error]: ${networkError}`);
        }),
        ApolloLink.split(
          (operation) => operation.getContext().hasUpload,
          new ApolloLink((operation) => ApolloLink.execute(createUploadLink(httpOptions(operation)), operation)),
          new ApolloLink((operation) => ApolloLink.execute(createHttpLink(httpOptions(operation)), operation))
        ),
      ]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        },
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        },
        mutate: {
          errorPolicy: "all",
        },
      },
    });
  }

  static getHeaders(options: GraphQLAPIClientGetHeadersOptions): Record<string, string> {
    const headers: Record<string, string> = {
      "X-User-Agent": this.options.userAgent,
    };

    if (options.accessToken) headers["Authorization"] = `Bearer ${options.accessToken.token}`;

    return headers;
  }

  static async request<TRequest>(config: GraphQLAPIClientRequestConfig<TRequest, "query">): Promise<BaseGraphQLAPIResponse<TRequest, "query">>;
  static async request<TRequest>(config: GraphQLAPIClientRequestConfig<TRequest, "mutation">): Promise<BaseGraphQLAPIResponse<TRequest, "mutation">>;
  static async request<TRequest>(config: GraphQLAPIClientRequestConfig<TRequest, RequestMethod>): Promise<BaseGraphQLAPIResponse<TRequest, RequestMethod>>;
  static async request<TRequest>(config: GraphQLAPIClientRequestConfig<TRequest, RequestMethod>): Promise<BaseGraphQLAPIResponse<TRequest, RequestMethod>> {
    const {headers = {}, options = {}} = config;

    if (headers.accessToken && this.options.shouldRefreshToken()) {
      const response = await this.refreshToken({refreshToken: headers.accessToken.refreshToken}, options);

      if (response.success) {
        this.options.onRefreshToken(response.accessToken);
        headers.accessToken = response.accessToken;
      }
    }

    config.timeout = config.timeout ?? AppConfig.Settings.Server.graphql.apiClient.timeout;

    const baseRequestConfig: BaseGraphQLRequestConfig<TRequest, RequestMethod> = {
      ...config,
      client: this.client,
      headers: this.getHeaders(headers),
      options,
    };

    const context: BaseGraphQLAPIClientContext<typeof baseRequestConfig> = {
      ...(config.context as {}),
      requestConfig: baseRequestConfig,
    };

    return super.request<TRequest>({
      ...baseRequestConfig,
      context,
    });
  }

  static async fetchUser(request: FetchUserRequest, options: RequestOptions = {}): Promise<FetchUserResponse> {
    const response = await this.request({
      request,
      requestMethod: "query",
      gql: gql`
        query fetchUser {
          me {
            id
            firstName
            lastName
            email
            imageUrl
            imageData
          }
        }
      `,
      variables: {},
      headers: {
        accessToken: request.accessToken,
      },
      context: {},
      options,
    });

    if (response.success) {
      const {data} = response.rawResponse;

      if (data && data.me)
        return {
          success: true,
          user: Models.User.fromJSON(data.me),
        };
    }

    return {
      success: false,
      error: !response.success && this.isNetworkError(response.rawResponse) ? this.networkError() : this.genericError(),
    };
  }

  static async signIn(request: SignInRequest, options: RequestOptions = {}): Promise<SignInResponse> {
    const variables: MutationSignInArgs = {
      email: request.email,
      password: request.password,
      generateRefreshToken: true,
    };

    const response = await this.request({
      request,
      requestMethod: "mutation",
      gql: gql`
        mutation signIn($email: String!, $password: String!, $generateRefreshToken: Boolean) {
          signIn(email: $email, password: $password, generateRefreshToken: $generateRefreshToken) {
            token
            refreshToken
            expiresAt
          }
        }
      `,
      variables,
      context: {},
      options,
    });

    if (response.success) {
      const {data} = response.rawResponse;

      if (data && data.signIn) {
        return {
          success: true,
          accessToken: Models.AccessToken.fromJSON(data.signIn),
        };
      }
    }

    return {
      success: false,
      error: !response.success && this.isNetworkError(response.rawResponse) ? this.networkError() : this.genericError(),
    };
  }

  static async refreshToken(request: RefreshTokenRequest, options: RequestOptions = {}): Promise<RefreshTokenResponse> {
    const variables: MutationRefreshTokensArgs = {
      token: request.refreshToken,
    };

    const response = await this.request({
      request,
      requestMethod: "mutation",
      gql: gql`
        mutation refreshTokens($token: String!) {
          refreshTokens(token: $token) {
            token
            refreshToken
            expiresAt
          }
        }
      `,
      variables,
      context: {},
      options,
    });

    if (response.success) {
      const {data} = response.rawResponse;

      if (data?.refreshTokens)
        return {
          success: true,
          accessToken: Models.AccessToken.fromJSON(data.refreshTokens),
        };
    }

    return {
      success: false,
      error: !response.success && this.isNetworkError(response.rawResponse) ? this.networkError() : this.genericError(),
    };
  }

  static async signUp(request: SignUpRequest, options: RequestOptions = {}): Promise<SignUpResponse> {
    const variables: MutationSignUpArgs = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      password: request.password,
      upload: request.upload,
    };

    const response = await this.request({
      request,
      requestMethod: "mutation",
      gql: gql`
        mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $upload: Upload) {
          signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password, upload: $upload) {
            token
            refreshToken
            expiresAt
          }
        }
      `,
      variables,
      context: {},
      options,
    });

    if (response.success)
      return {
        success: true,
      };

    return {
      success: false,
      error: !response.success && this.isNetworkError(response.rawResponse) ? this.networkError() : this.genericError(),
    };
  }

  static async updateUser(request: UpdateUserRequest, options: RequestOptions = {}): Promise<UpdateUserResponse> {
    const variables: MutationUpdateUserArgs = {
      id: request.id,
      user: {
        firstName: request.firstName,
        lastName: request.lastName,
      },
      image: request.upload,
    };

    const response = await this.request({
      request,
      requestMethod: "mutation",
      gql: gql`
        mutation updateUser($id: ID!, $user: UpdateUserInput!) {
          updateUser(id: $id, user: $user) {
            id
            firstName
            lastName
            email
            imageUrl
            imageData
          }
        }
      `,
      variables,
      context: {},
      headers: {accessToken: request.accessToken},
      options,
    });

    if (response.success) {
      const {data} = response.rawResponse;

      if (data && data.updateUser) {
        return {
          success: true,
          user: Models.User.fromJSON(data.updateUser),
        };
      }
    }

    return {
      success: false,
      error: !response.success && this.isNetworkError(response.rawResponse) ? this.networkError() : this.genericError(),
    };
  }

  static async requestResetPassword(request: RequestResetPasswordRequest, options: RequestOptions = {}): Promise<RequestResetPasswordResponse> {
    const variables: MutationRequestResetPasswordArgs = {
      email: request.email,
    };

    const response = await this.request({
      request,
      requestMethod: "mutation",
      gql: gql`
        mutation requestResetPassword($email: String!) {
          requestResetPassword(email: $email)
        }
      `,
      variables,
      context: {},
      options,
    });

    if (response.success) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      error: !response.success && this.isNetworkError(response.rawResponse) ? this.networkError() : this.genericError(),
    };
  }
}
