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
        <article className="bg-white center mw6 ba b--black-10 mv4 outline w-80 pa5">
            <h3 className="link dim lh-title pointer underline dark-blue">
                <Link to={`/articles=${article_id}`}>{title}</Link>
            </h3>
            <dl>
                <dt className="b ttc">{topic}</dt>
                <dt>By: {author}</dt>
                <dt>{created_at.slice(0, 10)}</dt>
                <dt>Kudos: {votes}</dt>
                <dt>Comments: {comment_count}</dt>
            </dl>
        </article>
    );
}
