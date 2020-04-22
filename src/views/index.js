/** Partials */
import Content from './partials/content'

/**
 * Index.
 *
 * @prop {object} posts
 */
export default ({posts}) =>
  posts.map(({node: {title, uri, excerpt}}) =>
    <Content
      title={title}
      uri={uri}
      excerpt={excerpt}
    />
  )
