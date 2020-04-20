/** Next */
import Link from 'next/link'

/** Styled components */
import Heading from './../styled/Heading'

/**
 * Content Title
 *
 * @prop {string} text
 * @prop {string} url
 */
const Title = ({ text, url }) =>
  <Heading>
    <Link href={`/[slug]`} prefetch={false} as={url}>
      {text}
    </Link>
  </Heading>

/**
 * RichText
 *
 * @prop {string} inner
 */
const RichText = ({ inner }) =>
  <div dangerouslySetInnerHTML={{ __html: inner }} />

export {
  Title,
  RichText,
}
