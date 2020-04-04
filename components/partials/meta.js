/**
 * Partials
 */
const Title = ({ text, url }) =>
  <h1>
    <a href={url} dangerouslySetInnerHTML={{__html: text}} />
  </h1>

const Excerpt = ({ inner }) => ! inner ? [] :
  <div dangerouslySetInnerHTML={{__html: inner}} />

const Content = ({ inner }) => ! inner ? [] :
  <div dangerouslySetInnerHTML={{__html: inner}} />

export {
  Content,
  Excerpt,
  Title,
}
