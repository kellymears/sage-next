/** @theme-ui */
import { Box, Heading} from 'theme-ui'

/** Application partials */
import Content from './partials/content'

/**
 * Archive
 *
 * @prop {object} posts
 */
export default ({name, description, posts}) =>
  <Box>
    <Heading as={'h2'}>
      {name}
    </Heading>

    {description && (
      <Box dangerouslySetInnerHTML={{ __html: description }} />
    )}

    {posts && posts.map(
      ({node: {title, excerpt, uri}}) =>
        <Content
          title={title || null}
          uri={uri || null}
          excerpt={excerpt || null}
        />
    )}
  </Box>
