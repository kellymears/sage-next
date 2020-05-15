const chalk = require('chalk')
const {join} = require('path')
const sharp = require('sharp')
const request = require('request')
const {GraphQLClient} = require('graphql-request')

const SITEURL = `http://kellymears.vagrant`

/**
 * Process image
 */
const processImage = async ({sourceUrl, mimeType}) => {
  await request({
    url: sourceUrl,
    encoding: null,
  }, (err, res, bodyBuffer) => {
    let processed

    if (mimeType == 'image/png') {
      processed = sharp(bodyBuffer)
        .png({quality: 70})
    }

    if (mimeType == 'image/jpeg') {
      processed = sharp(bodyBuffer)
        .jpeg({quality: 70})
    }

    processed.toFile(
      join(__dirname, `public/${sourceUrl.replace(`${SITEURL}`, '')}`)
    )
  })
}

/**
 * Request media items from WPGraphQL
 */
const getMediaItems = async () => {
  const {mediaItems} = await new GraphQLClient(
    `${SITEURL}/wp/graphql`,
    {mode: 'no-cors'},
  ).request(`{
    mediaItems {
      edges {
        node {
          sourceUrl
          mimeType
          mediaDetails {
            file
            sizes {
              width
              height
              sourceUrl
              mimeType
            }
          }
        }
      }
    }
  }`)

  return mediaItems
}

console.log(`\nProcessing WordPress Media Library.`)
console.log(`Saving to ${chalk.green('/public')}.`)

getMediaItems().then(async ({edges}) =>
  edges.filter(({node: {mediaType}}) => mediaType !== 'image')
  .forEach(async ({
    node: {
      sourceUrl,
      mimeType,
      mediaDetails: {
        file,
        sizes
      },
    },
  }) => {
    await processImage({sourceUrl, mimeType})
    console.log(chalk.blue(`\n 📸 [${mimeType}] ${file}`))

    await (async() => {
      sizes.map(({sourceUrl, width, height}) => {
        processImage({sourceUrl, mimeType})

        console.log(chalk.green(` ✔ [${width}x${height}] variant`))
      })
    })()
  })
)
