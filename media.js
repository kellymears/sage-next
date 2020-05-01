const chalk = require('chalk')
const {join} = require('path')
const fs = require('fs-extra')
const {GraphQLClient} = require('graphql-request')

const siteHost = `http://kellymears.vagrant`
const uploads = `/app/uploads/`

/**
 * Write a remote image to the disk
 *
 * @param {string} url
 * @param {string} path
 */
const download = async (url, path) => {
  console.log(`\n${chalk.blueBright(url)} => ${chalk.magentaBright(path)}...`)

  fs.ensureFileSync(path)

  const res = await fetch(url)
  const fileStream = fs.createWriteStream(path)

  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream)
    res.body.on('error', err => {
      console.error(chalk.red(err))
      reject(err)
    })
    fileStream.on('finish', function () {
      resolve()
    })
  })
}

/**
 * Write media library to /public
 */
;(async function () {
  console.log(`\nWriting media library items to ${chalk.green('/public')}`)
  const {mediaItems} = await new GraphQLClient(`${siteHost}/wp/graphql`, {mode: 'no-cors'})
    .request(`{
    mediaItems {
      edges {
        node {
          sourceUrl
        }
      }
    }
  }`)

  mediaItems.edges.forEach(({node: {sourceUrl}}) => {
    const outputPath = join(__dirname, `public/${sourceUrl.replace(`${siteHost}${uploads}`, '')}`)
    download(sourceUrl, outputPath)
  })
})()
