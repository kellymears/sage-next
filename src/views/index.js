/** Partials */
import Content from './partials/content'

/**
 * Index.
 *
 * @prop {object} posts
 */
export default ({posts}) => posts.map(post =>
  <Content {...post} />
)
