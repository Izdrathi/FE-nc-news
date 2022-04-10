import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import * as api from "../utils/api.js";
import { useParams, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";

export default function ArticlesList() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        setIsLoading(true);
        api.getArticles(slug).then((articles) => {
            if (articles.length === 0) {
                setErr("error");
                setIsLoading(false);
            } else {
                setArticles(articles);
                setIsLoading(false);
                setErr(null);
            }
        });
    }, [slug]);

    if (isLoading) return <p>loading..</p>;
    if (err) return <ErrorPage />;

    return (
        <>
            <span>
                <Link to="/articles/sort/:sortedby">Sort articles</Link>
            </span>
            <section className="ArticlesList">
                {articles.map(
                    ({
                        article_id,
                        title,
                        body,
                        topic,
                        author,
                        votes,
                        created_at,
                        comment_count,
                    }) => {
                        return (
                            <ArticleCard
                                key={article_id}
                                article_id={article_id}
                                title={title}
                                body={body}
                                topic={topic}
                                author={author}
                                votes={votes}
                                created_at={created_at}
                                comment_count={comment_count}
                            />
                        );
                    }
                )}
            </section>
        </>
    );
}
