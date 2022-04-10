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
        <article>
            <h3>
                <Link to={`/articles=${article_id}`}>{title}</Link>
            </h3>
            <dl>
                <dt>{topic}</dt>
                <dt>By: {author}</dt>
                <dt>{created_at.slice(0, 10)}</dt>
                <dt>Kudos: {votes}</dt>
                <dt>Comments: {comment_count}</dt>
            </dl>
        </article>
    );
}
