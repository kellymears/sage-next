/**
 * Partials
 */
const Title = ({ inner }) => ! inner ? [] :
  <h1 dangerouslySetInnerHTML={{__html: inner}} />

const Excerpt = ({ inner }) => ! inner ? [] :
  <div dangerouslySetInnerHTML={{__html: inner}} />

const Content = ({ inner }) => ! inner ? [] :
  <div dangerouslySetInnerHTML={{__html: inner}} />

export {
  Content,
  Excerpt,
  Title,
}