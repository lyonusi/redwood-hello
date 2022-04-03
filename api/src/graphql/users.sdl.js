export const schema = gql`
  type User {
    id: String!
    email: String!
    is_email_verified: Boolean!
    username: String!
    hashedPassword: String!
    salt: String!
    bio: String
    profile_pic_url: String
    created_at: DateTime!
    updated_at: DateTime!
    resetToken: String
    resetTokenExpiresAt: DateTime
    audits: [Audit]!
  }

  type Query {
    users: [User!]! @requireAuth
  }

  input CreateUserInput {
    email: String!
    is_email_verified: Boolean!
    username: String!
    hashedPassword: String!
    salt: String!
    bio: String
    profile_pic_url: String
    created_at: DateTime!
    updated_at: DateTime!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    is_email_verified: Boolean
    username: String
    hashedPassword: String
    salt: String
    bio: String
    profile_pic_url: String
    created_at: DateTime
    updated_at: DateTime
    resetToken: String
    resetTokenExpiresAt: DateTime
  }
  type Mutation {
    emailUser(id: String!): User! @skipAuth
  }
`

//emailUser(id: String!): User! @requireAuth
