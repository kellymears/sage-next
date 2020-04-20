/** Application partials */
import Content from './../partials/content'

/**
 * Index
 */
export default ({ posts }) =>
  posts.map(({ node: post }, id) =>
    <Content
      id={id}
      title={post.title || null}
      uri={post.uri || null}
      excerpt={post.excerpt || null}
    />
  )
