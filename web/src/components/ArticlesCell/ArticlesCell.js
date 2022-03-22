import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query BlogPostsQuery {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

// export const Success = ({ posts }) => {
//   return posts.map((posts) => (
//     <article key={posts.id}>
//       <header>
//         <h2>
//           <Link to={routes.posts({ id: posts.id })}>{posts.title}</Link>
//         </h2>
//       </header>
//       <p>{posts.body}</p>
//       <div>Posted at: {posts.createdAt}</div>
//     </article>
//   ))
// }

export const Success = ({ posts }) => {
  return posts.map((article) => (
    <article key={article.id}>
      <header>
        <h2>
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
      </header>
      <p>{article.body}</p>
      <div>Posted at: {article.createdAt}</div>
    </article>
  ))
}
