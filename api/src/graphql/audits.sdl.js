export const schema = gql`
  type Audit {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    user: User!
    log: String!
  }

  type Query {
    audits: [Audit!]! @requireAuth
  }

  input CreateAuditInput {
    userId: String!
    log: String!
  }

  input UpdateAuditInput {
    userId: String
    log: String
  }
`
