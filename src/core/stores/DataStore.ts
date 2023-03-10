import * as _ from "lodash";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import moment from "moment";
import intl, {ReactIntlUniversalOptions} from "react-intl-universal";

import {GraphQLAPIClient} from "../apiclient/graphql/GraphQLAPIClient";
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
  RequestResetPasswordRequest,
  RequestResetPasswordResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  FetchUserRequest,
  FetchUserResponse,
  SignInRequest,
  SignInResponse,
} from "../apiclient/graphql/GraphQLAPIClient.types";
import {AppConfig} from "../AppConfig";
import {Locale} from "../locales/Locale";
import * as Models from "../models";
import {CoreHelper} from "../utils/CoreHelper";

export type AuthenticationState = {
  user?: Models.User;
  accessToken?: Models.AccessToken;
  loadingRequestResetPassword: boolean;
  loadingSignUp: boolean;
  loadingSignIn: boolean;
  loadingUser: boolean;
  loadingUpdateUser: boolean;
};

export class DataStore {
  private static instance: DataStore | undefined;

  private initializing = false;
  private initialized = false;

  currentLocale: Locale = undefined as any;

  private authenticationInitialState: AuthenticationState = {
    loadingRequestResetPassword: false,
    loadingSignUp: false,
    loadingSignIn: false,
    loadingUser: false,
    loadingUpdateUser: false,
  };

  authenticationState: AuthenticationState = _.cloneDeep(this.authenticationInitialState);

  // eslint-disable-next-line
  private constructor() {
    makeObservable<DataStore, "initializing" | "initialized" | "loadLocale">(this, {
      initializing: observable,
      initialized: observable,
      currentLocale: observable,
      authenticationState: observable,
      isInitializing: computed,
      isInitialized: computed,
      isAccessTokenExpired: computed,
      initialize: action,
      fetchUser: action,
      loadLocale: action,
      setLocale: action,
      setAccessToken: action,
      reset: action,
      signIn: action,
      signUp: action,
      requestResetPassword: action,
      updateUser: action,
    });
  }

  static getInstance(): DataStore {
    if (!DataStore.instance) DataStore.instance = new DataStore();

    return DataStore.instance;
  }

  get isInitializing(): boolean {
    return this.initializing;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  get isAccessTokenExpired(): boolean {
    const {accessToken} = this.authenticationState;

    return !accessToken || moment().add(1, "hour").isSameOrAfter(accessToken.expiresAt, "minutes");
  }

  async initialize(): Promise<any> {
    this.initializing = true;

    await this.loadLocale();

    this.initializing = false;
    this.initialized = true;
  }

  private async loadLocale(locale?: Locale) {
    const {currentLocale} = this;

    const nextLocale = locale || AppConfig.Settings.Localization.defaultLocale;

    if (currentLocale && nextLocale && nextLocale.code === currentLocale.code) return;

    this.currentLocale = nextLocale;

    // https://github.com/moment/moment/issues/3624
    const hyphenIndex = nextLocale.code.indexOf("-");
    const momentLocale = moment.locale(hyphenIndex === -1 ? nextLocale.code : nextLocale.code.substr(0, hyphenIndex));

    const locales: Record<string, Locale> = {};

    for (const l of AppConfig.Settings.Localization.locales as Locale[]) locales[l.code] = l;

    const intlOptions: ReactIntlUniversalOptions = {
      currentLocale: nextLocale.code,
      locales,
      warningHandler: (warning: string) => {
        if (warning.indexOf("is not supported.") === -1) console.warn(warning);
      },
    };
    await intl.init(intlOptions);

    moment.updateLocale(momentLocale, {
      calendar: {
        lastDay: `[${CoreHelper.formatMessage("Common-yesterday")}]`,
        sameDay: `[${CoreHelper.formatMessage("Common-today")}]`,
        nextDay: `[${CoreHelper.formatMessage("Common-tomorrow")}]`,
        lastWeek: "L",
        nextWeek: "L",
        sameElse: "L",
      },
      relativeTime: {
        future: (text) => text,
        past: (text) => text,
        s: `%d ${CoreHelper.formatMessage("Common-second")}`,
        ss: `%d ${CoreHelper.formatMessage("Common-seconds")}`,
        m: `%d ${CoreHelper.formatMessage("Common-minute")}`,
        mm: `%d ${CoreHelper.formatMessage("Common-minutes")}`,
        h: `%d ${CoreHelper.formatMessage("Common-hour")}`,
        hh: `%d ${CoreHelper.formatMessage("Common-hours")}`,
        d: `%d ${CoreHelper.formatMessage("Common-day")}`,
        dd: (value) => {
          if (value < 7) {
            return `${value} ${CoreHelper.formatMessage("Common-days")}`;
          } else {
            const weeks = Math.round(value / 7);
            return `${weeks} ${weeks > 1 ? CoreHelper.formatMessage("Common-weeks") : CoreHelper.formatMessage("Common-week")}`;
          }
        },
        M: `%d ${CoreHelper.formatMessage("Common-month")}`,
        MM: `%d ${CoreHelper.formatMessage("Common-months")}`,
        y: `%d ${CoreHelper.formatMessage("Common-year")}`,
        yy: `%d ${CoreHelper.formatMessage("Common-years")}`,
      },
    });
  }

  async setLocale(locale: Locale) {
    const {currentLocale} = this;

    if (!currentLocale || currentLocale.code !== locale.code) await this.loadLocale(locale);
  }

  setAccessToken(accessToken: Models.AccessToken) {
    this.authenticationState.accessToken = accessToken;
  }

  reset() {
    this.authenticationState = _.cloneDeep(this.authenticationInitialState);
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    this.authenticationState.loadingSignIn = true;

    const response = await GraphQLAPIClient.signIn(request);

    runInAction(() => {
      this.authenticationState.loadingSignIn = false;

      if (response.success) this.authenticationState.accessToken = response.accessToken;
    });

    return response;
  }

  async fetchUser(request: FetchUserRequest): Promise<FetchUserResponse> {
    this.authenticationState.loadingUser = true;

    const response = await GraphQLAPIClient.fetchUser(request);

    runInAction(() => {
      this.authenticationState.loadingUser = false;

      if (response.success) this.authenticationState.user = response.user;
    });

    return response;
  }

  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await GraphQLAPIClient.refreshToken(request);

    runInAction(() => {
      if (response.success) this.setAccessToken(response.accessToken);
    });

    return response;
  }

  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    this.authenticationState.loadingSignUp = true;

    const response = await GraphQLAPIClient.signUp(request);

    runInAction(() => {
      this.authenticationState.loadingSignUp = false;
    });

    return response;
  }

  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    this.authenticationState.loadingUpdateUser = true;

    const response = await GraphQLAPIClient.updateUser(request);

    runInAction(() => {
      this.authenticationState.loadingUpdateUser = false;

      if (response.success && response.user.id === this.authenticationState.user?.id) this.authenticationState.user = response.user;
    });

    return response;
  }

  async requestResetPassword(request: RequestResetPasswordRequest): Promise<RequestResetPasswordResponse> {
    this.authenticationState.loadingRequestResetPassword = true;

    const response = await GraphQLAPIClient.requestResetPassword(request);

    runInAction(() => {
      this.authenticationState.loadingRequestResetPassword = false;
    });

    return response;
  }
}
