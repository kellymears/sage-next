import P from './core-paragraph'

const blockComponents = {
  'core/paragraph': 'P',
  'core/heading': 'H',
}

export default ({block: {blockName, ...props}}) => {
  const Block = blockComponents[blockName]
  return <Block {...props} />
}
