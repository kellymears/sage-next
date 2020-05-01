# Sage Next

> A static WordPress starter theme built with WPGraphQL and the next.js framework.

**Important note:** while I am on the Roots team, this is not an official Roots project, despite the name. This is just me experimenting and thinking about what some future Sage _could_ look like.

This project can either be used directly as a WordPress theme or -- better yet -- a fully static site generator.

## Requirements

- Node
- WPGraphQL

## Features

- Static site generation and component rehydration
- GraphQL data modeling
- CSS-in-JS theming
- Despite being very opinionated it's really not so opinionated at all.

## Build commands

`yarn dev` starts up an HMR dev server to hack on
`yarn build` compiles the theme and writes the static content to the out dir.

## Structure

Important locations:

```sh

# Config
├── index.php
└── next.config.js

# Components (views)
└── components
    ├── layout
    │   └── index.js
    ├── partials
    │   └── content.js
    ├── archive.js
    ├── index.js
    └── single.js

# Pages (controllers)
└── pages
    ├── _app.js
    ├── index.js
    ├── [slug].js
    ├── category
    │   └── [slug].js
    └── tag
        └── [slug].js

# Theme
└── theme
    └── index.js

```

## Optimize assets

If you `require` image assets instead of specifying them via URL you can optimize them at build time using a variety of Gatsby-esque filters. It's pretty jammy.

```jsx
<header>
  <picture>
    <source
      srcSet={require('./../resources/images/image.png?webp&resize&size=800&trace')}
      type="image/webp"
    />
    <source
      srcSet={require('./../resources/images/image.png?resize&size=800&trace')}
      type="image/png"
    />
    <img src={require('./../resources/images/image.png?resize&size=800&trace')} />
  </picture>
</header>
```
