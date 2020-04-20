import Heading from '../styled/Heading'
import { RichText } from '../partials/meta'
import Article from '../styled/Article'

/**
 * Single article template
 */
export default ({ post }) =>
  <Article>
    <Heading>{post.title}</Heading>
    <RichText inner={post.content || null} />
  </Article>
