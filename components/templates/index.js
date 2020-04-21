/** Application partials */
import Content from './../partials/content'

/**
 * Index template
 *
 * @prop {object} posts
 */
export default ({ posts }) =>
  posts.map(({ node: { title, uri, excerpt } }, id) =>
    <Content
      id={id}
      title={title || null}
      uri={uri || null}
      excerpt={excerpt || null}
    />
  )
