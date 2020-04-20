import { RichText, Title } from '../partials/meta'
import Article from '../styled/Article'

/**
 * Content Partial
 *
 * @prop {number} id
 * @prop {string} title
 * @prop {string} uri
 * @prop {string} excerpt
 */
const Content = ({ id, title, uri, excerpt }) => (
  <Article key={id}>
    <Title text={title || null} url={uri} />
    <RichText inner={excerpt || null} />
  </Article>
)

export default Content
