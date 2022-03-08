export default function ArticleCard({
  title,
  topic,
  author,
  votes,
  created_at,
  comment_count,
}) {
  return (
    <article className="bg-light-gray center mw6 ba b--black-10 mv4 outline w-80 pa5">
      <h3 className="link dim lh-title pointer underline dark-blue">{title}</h3>
      <p className="b">{topic}</p>
      <p>By: {author}</p>
      <p>Kudos: {votes}</p>
      <p>Comments: {comment_count}</p>
      <p>{created_at.slice(0, 10)}</p>
    </article>
  );
}
