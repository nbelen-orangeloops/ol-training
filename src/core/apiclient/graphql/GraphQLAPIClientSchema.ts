import {gql} from "graphql-tag";

export const typeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION

  directive @isAdministrator on FIELD_DEFINITION

  directive @isAdministratorOrUserIsMe on FIELD_DEFINITION

  directive @isTrusted on FIELD_DEFINITION

  directive @hasAnyRoleOf(roles: [String!]!, default: String) on FIELD_DEFINITION

  """
  The \`Byte\` scalar type represents byte value as a Buffer
  """
  scalar Byte

  """
  A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the \`date-time\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
  """
  scalar DateTime

  """
  The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
  """
  scalar JSON

  """
  The \`JSONObject\` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
  """
  scalar JSONObject

  scalar Upload

  """
  Represents NULL values
  """
  scalar Void

  type Query {
    _: Void
    version: String
    reset: Void
    me: User
    user(id: ID!): User
    users(text: String, firstName: String, lastName: String, email: String, status: [UserStatus!], role: [UserRole!], orderBy: UserOrder, first: Int, offset: Int): UserConnection!
    file(id: ID!): File
    files(deviceId: String, userId: String, name: String, extension: String, status: [FileStatus!], orderBy: FileOrder, first: Int, offset: Int): FileConnection!
    logs(text: String, startDate: DateTime, endDate: DateTime, source: [LogSource!], level: [LogLevel!], orderBy: LogOrder, first: Int, offset: Int): LogConnection!
    products: [Product]!
    myPurchases(productId: String, active: Boolean): PurchaseConnection!
    purchase(id: ID!): Purchase
    statistics: Statistics!
  }

  type Mutation {
    _: Void
    authenticate(type: AuthenticationType!, identity: String!, payload: AuthenticationPayload!): AccessToken
    signUp(firstName: String!, lastName: String, email: String!, password: String!, upload: Upload): AccessToken
    signIn(email: String!, password: String!, generateRefreshToken: Boolean = false): AccessToken
    refreshTokens(token: String!): AccessToken
    checkEmail(email: String!): CheckEmail
    confirmEmail(token: String!): Void
    resendEmailConfirmation(email: String!): Void
    requestResetPassword(email: String!): Void
    resetPassword(token: String!, password: String!): Void
    updatePassword(userId: String!, password: String!): Void
    createUser(user: CreateUserInput!, image: Upload): User
    updateUser(id: ID!, user: UpdateUserInput!, image: Upload): User
    deleteUser(id: ID!): Boolean!
    removeMe(id: ID!): Boolean!
    uploadUrl(deviceId: String, name: String!, extension: String, contentType: String, tags: JSONObject): FileUploadUrl!
    uploadOverwriteUrl(id: ID!, name: String!, extension: String, contentType: String, tags: JSONObject): FileUploadUrl!
    finishUpload(id: ID!): File!
    downloadUrl(id: ID!): FileDownloadUrl!
    updateFile(id: ID!, file: UpdateFileInput!): File
    deleteFile(id: ID!): Boolean!
    createLog(log: CreateLogInput!): Log
    createProduct(product: CreateProductInput!): Product
    updateProduct(id: String!, product: UpdateProductInput!): Product
    deleteProduct(id: String!): Boolean!
    createPurchase(purchase: CreatePurchaseInput!, payload: PurchasePayload): Purchase
    updatePurchase(id: ID!, purchase: UpdatePurchaseInput!): Purchase
    deletePurchase(id: ID!): Boolean!
  }

  type Subscription {
    _: Void
  }

  type ConnectionPageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  enum ConnectionOrderDirection {
    ASC
    DESC
  }

  type CheckEmail {
    isAvailable: Boolean
    isBlacklisted: Boolean
    isCorporate: Boolean
  }

  type AccessToken {
    userId: String!
    token: String!
    refreshToken: String
    expiresAt: DateTime
  }

  input AuthenticationPayloadForCustom {
    email: String!
    password: String!
  }

  input AuthenticationPayloadForApple {
    identityToken: String!
    authorizationCode: String!
    realUserStatus: Int
    firstName: String
    lastName: String
    email: String
  }

  input AuthenticationPayload {
    custom: AuthenticationPayloadForCustom
    apple: AuthenticationPayloadForApple
  }

  enum AuthenticationType {
    CUSTOM
    APPLE
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String
    status: UserStatus
    role: UserRole
    imageUrl: String
    imageData(height: Float, width: Float): Byte
    nickName: String
    area: String
    birthday: String
    bio: String
    country: String
    createdDate: DateTime!
    modifiedDate: DateTime!
    deletedDate: DateTime
    purchases: [Purchase]!
  }

  type UserConnection {
    edges: [UserEdge!]!
    pageInfo: ConnectionPageInfo!
    totalCount: Int!
  }

  type UserEdge {
    node: User!
    cursor: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
    role: UserRole
    nickName: String
    area: String
    birthday: String
    bio: String
    country: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    role: UserRole
    nickName: String
    area: String
    birthday: String
    bio: String
    country: String
  }

  input UserOrder {
    field: UserOrderField!
    direction: ConnectionOrderDirection!
  }

  enum UserOrderField {
    FIRSTNAME
    LASTNAME
    EMAIL
    STATUS
    ROLE
    NICKNAME
    AREA
    BIRTHDAY
    BIO
    COUNTRY
    CREATED_DATE
    UPDATED_DATE
  }

  enum UserStatus {
    PENDING
    ACTIVE
    BLOCKED
  }

  enum UserRole {
    BASIC
    TRUSTED
    ADMINISTRATOR
  }

  type PublicUser {
    id: ID!
    firstName: String!
    lastName: String
    imageUrl: String
    imageData(height: Float, width: Float): Byte
    nickName: String
    bio: String
    country: String
  }

  type FileUploadUrl {
    id: ID!
    method: String!
    url: String!
    headers: JSONObject
    fields: JSONObject
    contentType: String!
    expirationDate: DateTime!
  }

  type FileDownloadUrl {
    id: ID!
    url: String!
    expirationDate: DateTime!
  }

  type File {
    id: ID!
    deviceId: String
    userId: String
    name: String!
    extension: String
    contentType: String
    size: Int
    notes: String
    privateData: FilePrivateData
    status: FileStatus!
    statusDate: DateTime!
    statusMessage: String
    storageType: FileStorageType!
    storageId: String
    storageUploadUrl: String
    storageDownloadUrl: String
    thumbnailUrl: String
    createdDate: DateTime!
    modifiedDate: DateTime!
    deletedDate: DateTime
  }

  type FilePrivateData {
    userId: String
    status: FilePrivateStatus!
    statusDate: DateTime!
    statusMessage: String
    notes: String
  }

  type FileConnection {
    edges: [FileEdge!]!
    pageInfo: ConnectionPageInfo!
    totalCount: Int!
  }

  type FileEdge {
    node: File!
    cursor: String!
  }

  input UpdateFileInput {
    notes: String
  }

  input FileOrder {
    field: FileOrderField!
    direction: ConnectionOrderDirection!
  }

  enum FileOrderField {
    DEVICE
    USER
    NAME
    EXTENSION
    PRIVATE_STATUS
    STATUS
    CREATED_DATE
    UPDATED_DATE
  }

  enum FileStatus {
    PENDING_UPLOAD
    READY
    INVALID
  }

  enum FilePrivateStatus {
    DEFAULT
    STATUS1
    STATUS2
  }

  enum FileStorageType {
    FILE_SYSTEM
    GOOGLE_CLOUD
    AMAZON_S3
  }

  type Log {
    id: ID!
    source: LogSource!
    userId: String
    level: LogLevel!
    title: String!
    description: String
    createdDate: DateTime!
    modifiedDate: DateTime!
    deletedDate: DateTime
  }

  type LogConnection {
    edges: [LogEdge!]!
    pageInfo: ConnectionPageInfo!
    totalCount: Int!
  }

  type LogEdge {
    node: Log!
    cursor: String!
  }

  input CreateLogInput {
    source: LogSource = UNKNOWN
    userId: String
    level: LogLevel = ERROR
    title: String!
    description: String
  }

  input LogOrder {
    field: LogOrderField!
    direction: ConnectionOrderDirection!
  }

  enum LogOrderField {
    TITLE
    LEVEL
    SOURCE
    CREATED_DATE
  }

  enum LogSource {
    UNKNOWN
    SERVER
    BACKOFFICE
    APP
  }

  enum LogLevel {
    INFO
    WARNING
    ERROR
  }

  type Product {
    id: String!
    title: String!
    createdDate: DateTime!
    modifiedDate: DateTime!
    deletedDate: DateTime
  }

  input CreateProductInput {
    id: String
    title: String!
  }

  input UpdateProductInput {
    title: String!
  }

  type Purchase {
    id: ID!
    purchaseDate: DateTime!
    type: PurchaseType!
    userId: String!
    transactionId: String!
    productId: String!
    price: Float
    quantity: Int
    active: Boolean!
    cancellationDate: DateTime
    expiresAt: DateTime
    createdDate: DateTime!
    modifiedDate: DateTime!
    deletedDate: DateTime
  }

  input PurchasePayloadForCustom {
    _: String
  }

  input PurchasePayloadForApple {
    receiptData: String!
  }

  input PurchasePayload {
    custom: PurchasePayloadForCustom
    apple: PurchasePayloadForApple
  }

  enum PurchaseType {
    CUSTOM
    APPLE
  }

  type PurchaseConnection {
    edges: [PurchaseEdge!]!
    pageInfo: ConnectionPageInfo!
    totalCount: Int!
  }

  type PurchaseEdge {
    node: Purchase!
    cursor: String!
  }

  input CreatePurchaseInput {
    type: PurchaseType!
    userId: String
    productId: String!
  }

  input UpdatePurchaseInput {
    active: Boolean
  }

  type Statistics {
    totalUsers(role: UserRole): Int!
  }
`;
