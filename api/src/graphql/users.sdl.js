export const schema = gql`
  type User {
    id: String!
    email: String!
    isEmailVerified: Boolean!
    username: String!
    hashedPassword: String!
    salt: String!
    bio: String
    profilePicUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
    resetToken: String
    resetTokenExpiresAt: DateTime
    audits: [Audit]!
  }

  type Query {
    users: [User!]! @requireAuth
  }

  input CreateUserInput {
    email: String!
    isEmailVerified: Boolean!
    username: String!
    hashedPassword: String!
    salt: String!
    bio: String
    profilePicUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    isEmailVerified: Boolean
    username: String
    hashedPassword: String
    salt: String
    bio: String
    profilePicUrl: String
    createdAt: DateTime
    updatedAt: DateTime
    resetToken: String
    resetTokenExpiresAt: DateTime
    verificationCode: String
    verificationCodeExpiresAt: DateTime
  }
  type Mutation {
    setEmailVerified(id: String!, code: String!): User! @skipAuth
  }
`
