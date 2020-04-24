/** @theme-ui */
import { Box, Heading} from 'theme-ui'

/** Partials */
import Content from './partials/content'

/**
 * Archive.
 *
 * @prop {object} posts
 */
export default ({name, description, posts}) =>
  <Box>
    <Heading as={'h2'}>{name}</Heading>
    <Box dangerouslySetInnerHTML={{ __html: description || null }} />

    {posts.edges && posts.edges.map(({node: {
      title,
      excerpt,
      nextLinkAs,
      nextLinkHref
    }}) =>
      <Content
        title={title || null}
        nextLinkAs={nextLinkAs}
        nextLinkHref={nextLinkHref}
        excerpt={excerpt || null}
      />
    )}
  </Box>
