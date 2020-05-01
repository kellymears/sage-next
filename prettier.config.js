module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: false,
  trailingComma: 'all',
  semi: false,
  parser: 'babel',
  overrides: [
    {
      files: ['*.md'],
      options: {
        parser: 'markdown',
      },
    },
  ],
}
