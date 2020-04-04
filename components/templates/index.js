import { Excerpt, Title } from '../partials/meta'

/**
 * Posts content
 */
export default ({ posts }) =>
  posts.map(({ node: post }, id) =>
    <article key={id}>
      <Title inner={post.title || null} />
      <Excerpt inner={post.excerpt || null} />
    </article>
  )
