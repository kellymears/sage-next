export default ({ post }) =>
  <article>
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={{
      __html: post.content || null
    }} />
  </article>
