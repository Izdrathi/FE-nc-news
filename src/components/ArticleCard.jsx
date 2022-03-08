import { Link } from "react-router-dom";

export default function ArticleCard({
  article_id,
  title,
  topic,
  author,
  votes,
  created_at,
  comment_count,
}) {
  return (
    <article className="bg-light-gray center mw6 ba b--black-10 mv4 outline w-80 pa5">
      <h3 className="link dim lh-title pointer underline dark-blue">
        <Link to={`articles=${article_id}`}>{title}</Link>
      </h3>
      <p className="b ttc">{topic}</p>
      <p>By: {author}</p>
      <p>Kudos: {votes}</p>
      <p>Comments: {comment_count}</p>
      <p>{created_at.slice(0, 10)}</p>
    </article>
  );
}
