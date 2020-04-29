/** @theme-ui */
import { Box, Heading} from 'theme-ui'

/** Partials */
import Content from './partials/content'

/**
 * Archive.
 *
 * @prop {string} name
 * @prop {string} description
 * @prop {object} posts
 */
export default ({name, description, posts}) =>
  <Box>
    <Heading as={'h2'}>{name}</Heading>
    <Box dangerouslySetInnerHTML={{__html: description}} />
    {posts.map(({title, excerpt, linkAs, linkHref}) =>
      <Content
        title={title}
        linkAs={linkAs}
        linkHref={linkHref}
        excerpt={excerpt}
      />
    )}
  </Box>
