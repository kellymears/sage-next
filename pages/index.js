import Head from 'next/head'
import client from '../lib/client'
import fragments from '../lib/fragments'
import AppLayout from '../components/layout'
import Index from '../components/templates/index'
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);
/*
 * Index
 */
export default ({ app, posts }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <>
      <Head>
        <title>{app.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            {app.title}
          </Heading>
        </Flex>

        <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <MenuItems>Docs</MenuItems>
          <MenuItems>Examples</MenuItems>
          <MenuItems>Blog</MenuItems>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <Button bg="transparent" border="1px">
            Create account
          </Button>
        </Box>
      </Flex>
      <Index posts={posts} />
    </>
  )
}

/**
 * Content graph
 */
const getStaticProps = async () => {
  const { generalSettings, posts } = await client.request(`{
    ${fragments.generalSettings}
    posts {
      edges {
        node {
          title
          excerpt
          content
          uri
        }
      }
    }
  }`)

  return {
    props: {
      app: generalSettings,
      posts: posts ? posts.edges : [],
    },
  }
}

export { getStaticProps }
