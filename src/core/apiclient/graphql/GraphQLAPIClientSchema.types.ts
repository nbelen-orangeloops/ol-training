// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {[P in K]-?: NonNullable<T[P]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  Upload: any;
  /** Represents NULL values */
  Void: any;
};

export type Query = {
  __typename?: "Query";
  _?: Maybe<Scalars["Void"]>;
  version?: Maybe<Scalars["String"]>;
  reset?: Maybe<Scalars["Void"]>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users: UserConnection;
  file?: Maybe<File>;
  files: FileConnection;
  logs: LogConnection;
  products: Array<Maybe<Product>>;
  myPurchases: PurchaseConnection;
  purchase?: Maybe<Purchase>;
  statistics: Statistics;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  text?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Array<UserStatus>>;
  role?: InputMaybe<Array<UserRole>>;
  orderBy?: InputMaybe<UserOrder>;
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type QueryFileArgs = {
  id: Scalars["ID"];
};

export type QueryFilesArgs = {
  deviceId?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  extension?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Array<FileStatus>>;
  orderBy?: InputMaybe<FileOrder>;
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type QueryLogsArgs = {
  text?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  source?: InputMaybe<Array<LogSource>>;
  level?: InputMaybe<Array<LogLevel>>;
  orderBy?: InputMaybe<LogOrder>;
  first?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type QueryMyPurchasesArgs = {
  productId?: InputMaybe<Scalars["String"]>;
  active?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryPurchaseArgs = {
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["Void"]>;
  authenticate?: Maybe<AccessToken>;
  signUp?: Maybe<AccessToken>;
  signIn?: Maybe<AccessToken>;
  refreshTokens?: Maybe<AccessToken>;
  checkEmail?: Maybe<CheckEmail>;
  confirmEmail?: Maybe<Scalars["Void"]>;
  resendEmailConfirmation?: Maybe<Scalars["Void"]>;
  requestResetPassword?: Maybe<Scalars["Void"]>;
  resetPassword?: Maybe<Scalars["Void"]>;
  updatePassword?: Maybe<Scalars["Void"]>;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser: Scalars["Boolean"];
  removeMe: Scalars["Boolean"];
  uploadUrl: FileUploadUrl;
  uploadOverwriteUrl: FileUploadUrl;
  finishUpload: File;
  downloadUrl: FileDownloadUrl;
  updateFile?: Maybe<File>;
  deleteFile: Scalars["Boolean"];
  createLog?: Maybe<Log>;
  createProduct?: Maybe<Product>;
  updateProduct?: Maybe<Product>;
  deleteProduct: Scalars["Boolean"];
  createPurchase?: Maybe<Purchase>;
  updatePurchase?: Maybe<Purchase>;
  deletePurchase: Scalars["Boolean"];
};

export type MutationAuthenticateArgs = {
  type: AuthenticationType;
  identity: Scalars["String"];
  payload: AuthenticationPayload;
};

export type MutationSignUpArgs = {
  firstName: Scalars["String"];
  lastName?: InputMaybe<Scalars["String"]>;
  email: Scalars["String"];
  password: Scalars["String"];
  upload?: InputMaybe<Scalars["Upload"]>;
};

export type MutationSignInArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  generateRefreshToken?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationRefreshTokensArgs = {
  token: Scalars["String"];
};

export type MutationCheckEmailArgs = {
  email: Scalars["String"];
};

export type MutationConfirmEmailArgs = {
  token: Scalars["String"];
};

export type MutationResendEmailConfirmationArgs = {
  email: Scalars["String"];
};

export type MutationRequestResetPasswordArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  token: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdatePasswordArgs = {
  userId: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateUserArgs = {
  user: CreateUserInput;
  image?: InputMaybe<Scalars["Upload"]>;
};

export type MutationUpdateUserArgs = {
  id: Scalars["ID"];
  user: UpdateUserInput;
  image?: InputMaybe<Scalars["Upload"]>;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationRemoveMeArgs = {
  id: Scalars["ID"];
};

export type MutationUploadUrlArgs = {
  deviceId?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  extension?: InputMaybe<Scalars["String"]>;
  contentType?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Scalars["JSONObject"]>;
};

export type MutationUploadOverwriteUrlArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
  extension?: InputMaybe<Scalars["String"]>;
  contentType?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Scalars["JSONObject"]>;
};

export type MutationFinishUploadArgs = {
  id: Scalars["ID"];
};

export type MutationDownloadUrlArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateFileArgs = {
  id: Scalars["ID"];
  file: UpdateFileInput;
};

export type MutationDeleteFileArgs = {
  id: Scalars["ID"];
};

export type MutationCreateLogArgs = {
  log: CreateLogInput;
};

export type MutationCreateProductArgs = {
  product: CreateProductInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars["String"];
  product: UpdateProductInput;
};

export type MutationDeleteProductArgs = {
  id: Scalars["String"];
};

export type MutationCreatePurchaseArgs = {
  purchase: CreatePurchaseInput;
  payload?: InputMaybe<PurchasePayload>;
};

export type MutationUpdatePurchaseArgs = {
  id: Scalars["ID"];
  purchase: UpdatePurchaseInput;
};

export type MutationDeletePurchaseArgs = {
  id: Scalars["ID"];
};

export type Subscription = {
  __typename?: "Subscription";
  _?: Maybe<Scalars["Void"]>;
};

export type ConnectionPageInfo = {
  __typename?: "ConnectionPageInfo";
  hasNextPage: Scalars["Boolean"];
  endCursor?: Maybe<Scalars["String"]>;
};

export enum ConnectionOrderDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type CheckEmail = {
  __typename?: "CheckEmail";
  isAvailable?: Maybe<Scalars["Boolean"]>;
  isBlacklisted?: Maybe<Scalars["Boolean"]>;
  isCorporate?: Maybe<Scalars["Boolean"]>;
};

export type AccessToken = {
  __typename?: "AccessToken";
  userId: Scalars["String"];
  token: Scalars["String"];
  refreshToken?: Maybe<Scalars["String"]>;
  expiresAt?: Maybe<Scalars["DateTime"]>;
};

export type AuthenticationPayloadForCustom = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type AuthenticationPayloadForApple = {
  identityToken: Scalars["String"];
  authorizationCode: Scalars["String"];
  realUserStatus?: InputMaybe<Scalars["Int"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
};

export type AuthenticationPayload = {
  custom?: InputMaybe<AuthenticationPayloadForCustom>;
  apple?: InputMaybe<AuthenticationPayloadForApple>;
};

export enum AuthenticationType {
  Custom = "CUSTOM",
  Apple = "APPLE",
}

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  status?: Maybe<UserStatus>;
  role?: Maybe<UserRole>;
  imageUrl?: Maybe<Scalars["String"]>;
  imageData?: Maybe<Scalars["Byte"]>;
  nickName?: Maybe<Scalars["String"]>;
  area?: Maybe<Scalars["String"]>;
  birthday?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  createdDate: Scalars["DateTime"];
  modifiedDate: Scalars["DateTime"];
  deletedDate?: Maybe<Scalars["DateTime"]>;
  purchases: Array<Maybe<Purchase>>;
};

export type UserImageDataArgs = {
  height?: InputMaybe<Scalars["Float"]>;
  width?: InputMaybe<Scalars["Float"]>;
};

export type UserConnection = {
  __typename?: "UserConnection";
  edges: Array<UserEdge>;
  pageInfo: ConnectionPageInfo;
  totalCount: Scalars["Int"];
};

export type UserEdge = {
  __typename?: "UserEdge";
  node: User;
  cursor: Scalars["String"];
};

export type CreateUserInput = {
  firstName: Scalars["String"];
  lastName?: InputMaybe<Scalars["String"]>;
  email: Scalars["String"];
  password: Scalars["String"];
  role?: InputMaybe<UserRole>;
  nickName?: InputMaybe<Scalars["String"]>;
  area?: InputMaybe<Scalars["String"]>;
  birthday?: InputMaybe<Scalars["String"]>;
  bio?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<UserRole>;
  nickName?: InputMaybe<Scalars["String"]>;
  area?: InputMaybe<Scalars["String"]>;
  birthday?: InputMaybe<Scalars["String"]>;
  bio?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
};

export type UserOrder = {
  field: UserOrderField;
  direction: ConnectionOrderDirection;
};

export enum UserOrderField {
  Firstname = "FIRSTNAME",
  Lastname = "LASTNAME",
  Email = "EMAIL",
  Status = "STATUS",
  Role = "ROLE",
  Nickname = "NICKNAME",
  Area = "AREA",
  Birthday = "BIRTHDAY",
  Bio = "BIO",
  Country = "COUNTRY",
  CreatedDate = "CREATED_DATE",
  UpdatedDate = "UPDATED_DATE",
}

export enum UserStatus {
  Pending = "PENDING",
  Active = "ACTIVE",
  Blocked = "BLOCKED",
}

export enum UserRole {
  Basic = "BASIC",
  Trusted = "TRUSTED",
  Administrator = "ADMINISTRATOR",
}

export type PublicUser = {
  __typename?: "PublicUser";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName?: Maybe<Scalars["String"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  imageData?: Maybe<Scalars["Byte"]>;
  nickName?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
};

export type PublicUserImageDataArgs = {
  height?: InputMaybe<Scalars["Float"]>;
  width?: InputMaybe<Scalars["Float"]>;
};

export type FileUploadUrl = {
  __typename?: "FileUploadUrl";
  id: Scalars["ID"];
  method: Scalars["String"];
  url: Scalars["String"];
  headers?: Maybe<Scalars["JSONObject"]>;
  fields?: Maybe<Scalars["JSONObject"]>;
  contentType: Scalars["String"];
  expirationDate: Scalars["DateTime"];
};

export type FileDownloadUrl = {
  __typename?: "FileDownloadUrl";
  id: Scalars["ID"];
  url: Scalars["String"];
  expirationDate: Scalars["DateTime"];
};

export type File = {
  __typename?: "File";
  id: Scalars["ID"];
  deviceId?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  extension?: Maybe<Scalars["String"]>;
  contentType?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Int"]>;
  notes?: Maybe<Scalars["String"]>;
  privateData?: Maybe<FilePrivateData>;
  status: FileStatus;
  statusDate: Scalars["DateTime"];
  statusMessage?: Maybe<Scalars["String"]>;
  storageType: FileStorageType;
  storageId?: Maybe<Scalars["String"]>;
  storageUploadUrl?: Maybe<Scalars["String"]>;
  storageDownloadUrl?: Maybe<Scalars["String"]>;
  thumbnailUrl?: Maybe<Scalars["String"]>;
  createdDate: Scalars["DateTime"];
  modifiedDate: Scalars["DateTime"];
  deletedDate?: Maybe<Scalars["DateTime"]>;
};

export type FilePrivateData = {
  __typename?: "FilePrivateData";
  userId?: Maybe<Scalars["String"]>;
  status: FilePrivateStatus;
  statusDate: Scalars["DateTime"];
  statusMessage?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
};

export type FileConnection = {
  __typename?: "FileConnection";
  edges: Array<FileEdge>;
  pageInfo: ConnectionPageInfo;
  totalCount: Scalars["Int"];
};

export type FileEdge = {
  __typename?: "FileEdge";
  node: File;
  cursor: Scalars["String"];
};

export type UpdateFileInput = {
  notes?: InputMaybe<Scalars["String"]>;
};

export type FileOrder = {
  field: FileOrderField;
  direction: ConnectionOrderDirection;
};

export enum FileOrderField {
  Device = "DEVICE",
  User = "USER",
  Name = "NAME",
  Extension = "EXTENSION",
  PrivateStatus = "PRIVATE_STATUS",
  Status = "STATUS",
  CreatedDate = "CREATED_DATE",
  UpdatedDate = "UPDATED_DATE",
}

export enum FileStatus {
  PendingUpload = "PENDING_UPLOAD",
  Ready = "READY",
  Invalid = "INVALID",
}

export enum FilePrivateStatus {
  Default = "DEFAULT",
  Status1 = "STATUS1",
  Status2 = "STATUS2",
}

export enum FileStorageType {
  FileSystem = "FILE_SYSTEM",
  GoogleCloud = "GOOGLE_CLOUD",
  AmazonS3 = "AMAZON_S3",
}

export type Log = {
  __typename?: "Log";
  id: Scalars["ID"];
  source: LogSource;
  userId?: Maybe<Scalars["String"]>;
  level: LogLevel;
  title: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  createdDate: Scalars["DateTime"];
  modifiedDate: Scalars["DateTime"];
  deletedDate?: Maybe<Scalars["DateTime"]>;
};

export type LogConnection = {
  __typename?: "LogConnection";
  edges: Array<LogEdge>;
  pageInfo: ConnectionPageInfo;
  totalCount: Scalars["Int"];
};

export type LogEdge = {
  __typename?: "LogEdge";
  node: Log;
  cursor: Scalars["String"];
};

export type CreateLogInput = {
  source?: InputMaybe<LogSource>;
  userId?: InputMaybe<Scalars["String"]>;
  level?: InputMaybe<LogLevel>;
  title: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
};

export type LogOrder = {
  field: LogOrderField;
  direction: ConnectionOrderDirection;
};

export enum LogOrderField {
  Title = "TITLE",
  Level = "LEVEL",
  Source = "SOURCE",
  CreatedDate = "CREATED_DATE",
}

export enum LogSource {
  Unknown = "UNKNOWN",
  Server = "SERVER",
  Backoffice = "BACKOFFICE",
  App = "APP",
}

export enum LogLevel {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
}

export type Product = {
  __typename?: "Product";
  id: Scalars["String"];
  title: Scalars["String"];
  createdDate: Scalars["DateTime"];
  modifiedDate: Scalars["DateTime"];
  deletedDate?: Maybe<Scalars["DateTime"]>;
};

export type CreateProductInput = {
  id?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type UpdateProductInput = {
  title: Scalars["String"];
};

export type Purchase = {
  __typename?: "Purchase";
  id: Scalars["ID"];
  purchaseDate: Scalars["DateTime"];
  type: PurchaseType;
  userId: Scalars["String"];
  transactionId: Scalars["String"];
  productId: Scalars["String"];
  price?: Maybe<Scalars["Float"]>;
  quantity?: Maybe<Scalars["Int"]>;
  active: Scalars["Boolean"];
  cancellationDate?: Maybe<Scalars["DateTime"]>;
  expiresAt?: Maybe<Scalars["DateTime"]>;
  createdDate: Scalars["DateTime"];
  modifiedDate: Scalars["DateTime"];
  deletedDate?: Maybe<Scalars["DateTime"]>;
};

export type PurchasePayloadForCustom = {
  _?: InputMaybe<Scalars["String"]>;
};

export type PurchasePayloadForApple = {
  receiptData: Scalars["String"];
};

export type PurchasePayload = {
  custom?: InputMaybe<PurchasePayloadForCustom>;
  apple?: InputMaybe<PurchasePayloadForApple>;
};

export enum PurchaseType {
  Custom = "CUSTOM",
  Apple = "APPLE",
}

export type PurchaseConnection = {
  __typename?: "PurchaseConnection";
  edges: Array<PurchaseEdge>;
  pageInfo: ConnectionPageInfo;
  totalCount: Scalars["Int"];
};

export type PurchaseEdge = {
  __typename?: "PurchaseEdge";
  node: Purchase;
  cursor: Scalars["String"];
};

export type CreatePurchaseInput = {
  type: PurchaseType;
  userId?: InputMaybe<Scalars["String"]>;
  productId: Scalars["String"];
};

export type UpdatePurchaseInput = {
  active?: InputMaybe<Scalars["Boolean"]>;
};

export type Statistics = {
  __typename?: "Statistics";
  totalUsers: Scalars["Int"];
};

export type StatisticsTotalUsersArgs = {
  role?: InputMaybe<UserRole>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{[key in TKey]: TResult}, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, {[key in TKey]: TResult}, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Byte: ResolverTypeWrapper<Scalars["Byte"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  ConnectionPageInfo: ResolverTypeWrapper<ConnectionPageInfo>;
  ConnectionOrderDirection: ConnectionOrderDirection;
  CheckEmail: ResolverTypeWrapper<CheckEmail>;
  AccessToken: ResolverTypeWrapper<AccessToken>;
  AuthenticationPayloadForCustom: AuthenticationPayloadForCustom;
  AuthenticationPayloadForApple: AuthenticationPayloadForApple;
  AuthenticationPayload: AuthenticationPayload;
  AuthenticationType: AuthenticationType;
  User: ResolverTypeWrapper<User>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
  UserOrder: UserOrder;
  UserOrderField: UserOrderField;
  UserStatus: UserStatus;
  UserRole: UserRole;
  PublicUser: ResolverTypeWrapper<PublicUser>;
  FileUploadUrl: ResolverTypeWrapper<FileUploadUrl>;
  FileDownloadUrl: ResolverTypeWrapper<FileDownloadUrl>;
  File: ResolverTypeWrapper<File>;
  FilePrivateData: ResolverTypeWrapper<FilePrivateData>;
  FileConnection: ResolverTypeWrapper<FileConnection>;
  FileEdge: ResolverTypeWrapper<FileEdge>;
  UpdateFileInput: UpdateFileInput;
  FileOrder: FileOrder;
  FileOrderField: FileOrderField;
  FileStatus: FileStatus;
  FilePrivateStatus: FilePrivateStatus;
  FileStorageType: FileStorageType;
  Log: ResolverTypeWrapper<Log>;
  LogConnection: ResolverTypeWrapper<LogConnection>;
  LogEdge: ResolverTypeWrapper<LogEdge>;
  CreateLogInput: CreateLogInput;
  LogOrder: LogOrder;
  LogOrderField: LogOrderField;
  LogSource: LogSource;
  LogLevel: LogLevel;
  Product: ResolverTypeWrapper<Product>;
  CreateProductInput: CreateProductInput;
  UpdateProductInput: UpdateProductInput;
  Purchase: ResolverTypeWrapper<Purchase>;
  PurchasePayloadForCustom: PurchasePayloadForCustom;
  PurchasePayloadForApple: PurchasePayloadForApple;
  PurchasePayload: PurchasePayload;
  PurchaseType: PurchaseType;
  PurchaseConnection: ResolverTypeWrapper<PurchaseConnection>;
  PurchaseEdge: ResolverTypeWrapper<PurchaseEdge>;
  CreatePurchaseInput: CreatePurchaseInput;
  UpdatePurchaseInput: UpdatePurchaseInput;
  Statistics: ResolverTypeWrapper<Statistics>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Byte: Scalars["Byte"];
  DateTime: Scalars["DateTime"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  Upload: Scalars["Upload"];
  Void: Scalars["Void"];
  Query: {};
  String: Scalars["String"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Boolean: Scalars["Boolean"];
  Mutation: {};
  Subscription: {};
  ConnectionPageInfo: ConnectionPageInfo;
  CheckEmail: CheckEmail;
  AccessToken: AccessToken;
  AuthenticationPayloadForCustom: AuthenticationPayloadForCustom;
  AuthenticationPayloadForApple: AuthenticationPayloadForApple;
  AuthenticationPayload: AuthenticationPayload;
  User: User;
  Float: Scalars["Float"];
  UserConnection: UserConnection;
  UserEdge: UserEdge;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
  UserOrder: UserOrder;
  PublicUser: PublicUser;
  FileUploadUrl: FileUploadUrl;
  FileDownloadUrl: FileDownloadUrl;
  File: File;
  FilePrivateData: FilePrivateData;
  FileConnection: FileConnection;
  FileEdge: FileEdge;
  UpdateFileInput: UpdateFileInput;
  FileOrder: FileOrder;
  Log: Log;
  LogConnection: LogConnection;
  LogEdge: LogEdge;
  CreateLogInput: CreateLogInput;
  LogOrder: LogOrder;
  Product: Product;
  CreateProductInput: CreateProductInput;
  UpdateProductInput: UpdateProductInput;
  Purchase: Purchase;
  PurchasePayloadForCustom: PurchasePayloadForCustom;
  PurchasePayloadForApple: PurchasePayloadForApple;
  PurchasePayload: PurchasePayload;
  PurchaseConnection: PurchaseConnection;
  PurchaseEdge: PurchaseEdge;
  CreatePurchaseInput: CreatePurchaseInput;
  UpdatePurchaseInput: UpdatePurchaseInput;
  Statistics: Statistics;
};

export type IsAuthenticatedDirectiveArgs = {};

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = {headers?: Record<string, string | undefined>}, Args = IsAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsAdministratorDirectiveArgs = {};

export type IsAdministratorDirectiveResolver<Result, Parent, ContextType = {headers?: Record<string, string | undefined>}, Args = IsAdministratorDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsAdministratorOrUserIsMeDirectiveArgs = {};

export type IsAdministratorOrUserIsMeDirectiveResolver<Result, Parent, ContextType = {headers?: Record<string, string | undefined>}, Args = IsAdministratorOrUserIsMeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsTrustedDirectiveArgs = {};

export type IsTrustedDirectiveResolver<Result, Parent, ContextType = {headers?: Record<string, string | undefined>}, Args = IsTrustedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasAnyRoleOfDirectiveArgs = {
  roles: Array<Scalars["String"]>;
  default?: Maybe<Scalars["String"]>;
};

export type HasAnyRoleOfDirectiveResolver<Result, Parent, ContextType = {headers?: Record<string, string | undefined>}, Args = HasAnyRoleOfDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Byte"], any> {
  name: "Byte";
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type QueryResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = {
  _?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  reset?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType, RequireFields<QueryUserArgs, "id">>;
  users?: Resolver<ResolversTypes["UserConnection"], ParentType, ContextType, Partial<QueryUsersArgs>>;
  file?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType, RequireFields<QueryFileArgs, "id">>;
  files?: Resolver<ResolversTypes["FileConnection"], ParentType, ContextType, Partial<QueryFilesArgs>>;
  logs?: Resolver<ResolversTypes["LogConnection"], ParentType, ContextType, Partial<QueryLogsArgs>>;
  products?: Resolver<Array<Maybe<ResolversTypes["Product"]>>, ParentType, ContextType>;
  myPurchases?: Resolver<ResolversTypes["PurchaseConnection"], ParentType, ContextType, Partial<QueryMyPurchasesArgs>>;
  purchase?: Resolver<Maybe<ResolversTypes["Purchase"]>, ParentType, ContextType, RequireFields<QueryPurchaseArgs, "id">>;
  statistics?: Resolver<ResolversTypes["Statistics"], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]> = {
  _?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
  authenticate?: Resolver<Maybe<ResolversTypes["AccessToken"]>, ParentType, ContextType, RequireFields<MutationAuthenticateArgs, "type" | "identity" | "payload">>;
  signUp?: Resolver<Maybe<ResolversTypes["AccessToken"]>, ParentType, ContextType, RequireFields<MutationSignUpArgs, "firstName" | "email" | "password">>;
  signIn?: Resolver<Maybe<ResolversTypes["AccessToken"]>, ParentType, ContextType, RequireFields<MutationSignInArgs, "email" | "password" | "generateRefreshToken">>;
  refreshTokens?: Resolver<Maybe<ResolversTypes["AccessToken"]>, ParentType, ContextType, RequireFields<MutationRefreshTokensArgs, "token">>;
  checkEmail?: Resolver<Maybe<ResolversTypes["CheckEmail"]>, ParentType, ContextType, RequireFields<MutationCheckEmailArgs, "email">>;
  confirmEmail?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType, RequireFields<MutationConfirmEmailArgs, "token">>;
  resendEmailConfirmation?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType, RequireFields<MutationResendEmailConfirmationArgs, "email">>;
  requestResetPassword?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType, RequireFields<MutationRequestResetPasswordArgs, "email">>;
  resetPassword?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, "token" | "password">>;
  updatePassword?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, "userId" | "password">>;
  createUser?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, "user">>;
  updateUser?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, "id" | "user">>;
  deleteUser?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, "id">>;
  removeMe?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationRemoveMeArgs, "id">>;
  uploadUrl?: Resolver<ResolversTypes["FileUploadUrl"], ParentType, ContextType, RequireFields<MutationUploadUrlArgs, "name">>;
  uploadOverwriteUrl?: Resolver<ResolversTypes["FileUploadUrl"], ParentType, ContextType, RequireFields<MutationUploadOverwriteUrlArgs, "id" | "name">>;
  finishUpload?: Resolver<ResolversTypes["File"], ParentType, ContextType, RequireFields<MutationFinishUploadArgs, "id">>;
  downloadUrl?: Resolver<ResolversTypes["FileDownloadUrl"], ParentType, ContextType, RequireFields<MutationDownloadUrlArgs, "id">>;
  updateFile?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType, RequireFields<MutationUpdateFileArgs, "id" | "file">>;
  deleteFile?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationDeleteFileArgs, "id">>;
  createLog?: Resolver<Maybe<ResolversTypes["Log"]>, ParentType, ContextType, RequireFields<MutationCreateLogArgs, "log">>;
  createProduct?: Resolver<Maybe<ResolversTypes["Product"]>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, "product">>;
  updateProduct?: Resolver<Maybe<ResolversTypes["Product"]>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, "id" | "product">>;
  deleteProduct?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, "id">>;
  createPurchase?: Resolver<Maybe<ResolversTypes["Purchase"]>, ParentType, ContextType, RequireFields<MutationCreatePurchaseArgs, "purchase">>;
  updatePurchase?: Resolver<Maybe<ResolversTypes["Purchase"]>, ParentType, ContextType, RequireFields<MutationUpdatePurchaseArgs, "id" | "purchase">>;
  deletePurchase?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationDeletePurchaseArgs, "id">>;
};

export type SubscriptionResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]> = {
  _?: SubscriptionResolver<Maybe<ResolversTypes["Void"]>, "_", ParentType, ContextType>;
};

export type ConnectionPageInfoResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["ConnectionPageInfo"] = ResolversParentTypes["ConnectionPageInfo"]> = {
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckEmailResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["CheckEmail"] = ResolversParentTypes["CheckEmail"]> = {
  isAvailable?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  isBlacklisted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  isCorporate?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccessTokenResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["AccessToken"] = ResolversParentTypes["AccessToken"]> = {
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes["UserStatus"]>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes["UserRole"]>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  imageData?: Resolver<Maybe<ResolversTypes["Byte"]>, ParentType, ContextType, Partial<UserImageDataArgs>>;
  nickName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  modifiedDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  purchases?: Resolver<Array<Maybe<ResolversTypes["Purchase"]>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["UserConnection"] = ResolversParentTypes["UserConnection"]> = {
  edges?: Resolver<Array<ResolversTypes["UserEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["ConnectionPageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["UserEdge"] = ResolversParentTypes["UserEdge"]> = {
  node?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicUserResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["PublicUser"] = ResolversParentTypes["PublicUser"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  imageData?: Resolver<Maybe<ResolversTypes["Byte"]>, ParentType, ContextType, Partial<PublicUserImageDataArgs>>;
  nickName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileUploadUrlResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["FileUploadUrl"] = ResolversParentTypes["FileUploadUrl"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  method?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  headers?: Resolver<Maybe<ResolversTypes["JSONObject"]>, ParentType, ContextType>;
  fields?: Resolver<Maybe<ResolversTypes["JSONObject"]>, ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expirationDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileDownloadUrlResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["FileDownloadUrl"] = ResolversParentTypes["FileDownloadUrl"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expirationDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["File"] = ResolversParentTypes["File"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  deviceId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  privateData?: Resolver<Maybe<ResolversTypes["FilePrivateData"]>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes["FileStatus"], ParentType, ContextType>;
  statusDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  statusMessage?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  storageType?: Resolver<ResolversTypes["FileStorageType"], ParentType, ContextType>;
  storageId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  storageUploadUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  storageDownloadUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  thumbnailUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  modifiedDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilePrivateDataResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["FilePrivateData"] = ResolversParentTypes["FilePrivateData"]> = {
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes["FilePrivateStatus"], ParentType, ContextType>;
  statusDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  statusMessage?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileConnectionResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["FileConnection"] = ResolversParentTypes["FileConnection"]> = {
  edges?: Resolver<Array<ResolversTypes["FileEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["ConnectionPageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileEdgeResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["FileEdge"] = ResolversParentTypes["FileEdge"]> = {
  node?: Resolver<ResolversTypes["File"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["Log"] = ResolversParentTypes["Log"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  source?: Resolver<ResolversTypes["LogSource"], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  level?: Resolver<ResolversTypes["LogLevel"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  modifiedDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogConnectionResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["LogConnection"] = ResolversParentTypes["LogConnection"]> = {
  edges?: Resolver<Array<ResolversTypes["LogEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["ConnectionPageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEdgeResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["LogEdge"] = ResolversParentTypes["LogEdge"]> = {
  node?: Resolver<ResolversTypes["Log"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["Product"] = ResolversParentTypes["Product"]> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  modifiedDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["Purchase"] = ResolversParentTypes["Purchase"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  purchaseDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["PurchaseType"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  cancellationDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  modifiedDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseConnectionResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["PurchaseConnection"] = ResolversParentTypes["PurchaseConnection"]> = {
  edges?: Resolver<Array<ResolversTypes["PurchaseEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["ConnectionPageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseEdgeResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["PurchaseEdge"] = ResolversParentTypes["PurchaseEdge"]> = {
  node?: Resolver<ResolversTypes["Purchase"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticsResolvers<ContextType = {headers?: Record<string, string | undefined>}, ParentType extends ResolversParentTypes["Statistics"] = ResolversParentTypes["Statistics"]> = {
  totalUsers?: Resolver<ResolversTypes["Int"], ParentType, ContextType, Partial<StatisticsTotalUsersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = {headers?: Record<string, string | undefined>}> = {
  Byte?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  ConnectionPageInfo?: ConnectionPageInfoResolvers<ContextType>;
  CheckEmail?: CheckEmailResolvers<ContextType>;
  AccessToken?: AccessTokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  PublicUser?: PublicUserResolvers<ContextType>;
  FileUploadUrl?: FileUploadUrlResolvers<ContextType>;
  FileDownloadUrl?: FileDownloadUrlResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  FilePrivateData?: FilePrivateDataResolvers<ContextType>;
  FileConnection?: FileConnectionResolvers<ContextType>;
  FileEdge?: FileEdgeResolvers<ContextType>;
  Log?: LogResolvers<ContextType>;
  LogConnection?: LogConnectionResolvers<ContextType>;
  LogEdge?: LogEdgeResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  PurchaseConnection?: PurchaseConnectionResolvers<ContextType>;
  PurchaseEdge?: PurchaseEdgeResolvers<ContextType>;
  Statistics?: StatisticsResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = {headers?: Record<string, string | undefined>}> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>;
  isAdministrator?: IsAdministratorDirectiveResolver<any, any, ContextType>;
  isAdministratorOrUserIsMe?: IsAdministratorOrUserIsMeDirectiveResolver<any, any, ContextType>;
  isTrusted?: IsTrustedDirectiveResolver<any, any, ContextType>;
  hasAnyRoleOf?: HasAnyRoleOfDirectiveResolver<any, any, ContextType>;
};
