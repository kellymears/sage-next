import { Excerpt, Title } from '../partials/meta'

/**
 * Posts content
 */
export default ({ posts }) =>
  posts.map(({ node: post }, id) =>
    <article key={id}>
      <Title text={post.title || null} url={post.uri} />
      <Excerpt inner={post.excerpt || null} />
    </article>
  )
