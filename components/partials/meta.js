import Link from 'next/link'

/**
 * Partials
 */
const Title = ({ text, url }) =>
  <h1>
    <Link href={`/[slug]`} prefetch={false} as={url}>
      <a dangerouslySetInnerHTML={{__html: text}} />
    </Link>
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
