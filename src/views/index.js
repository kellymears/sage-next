/** Partials */
import Content from './partials/content'

/**
 * Index.
 *
 * @prop {object} posts
 */
export default ({posts}) =>
  posts.edges.map(({node: {title, nextLinkHref, nextLinkAs, excerpt}}) =>
    <Content
      title={title}
      nextLinkHref={nextLinkHref}
      nextLinkAs={nextLinkAs}
      excerpt={excerpt}
    />
  )
