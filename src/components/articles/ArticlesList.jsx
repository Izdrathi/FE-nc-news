import { useEffect, useState } from "react";
import ArticleCard from "../articles/ArticleCard.jsx";
import * as api from "../../utils/api.js";
import { useParams } from "react-router-dom";
import ErrorPage from "../error/ErrorPage.jsx";
import { Sorting } from "../articles/Sorting.jsx";

export default function ArticlesList() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);
    const { slug } = useParams();
    const [sort, setSort] = useState();
    const [order, setOrder] = useState();

    useEffect(() => {
        setIsLoading(true);
        api.getArticles(slug, sort, order).then((articles) => {
            if (articles.length === 0) {
                setErr("error");
                setIsLoading(false);
            } else {
                setArticles(articles);
                setIsLoading(false);
                setErr(null);
            }
        });
    }, [slug, sort, order]);

    if (isLoading) return <span className="is-size-2">Loading..</span>;
    if (err) return <ErrorPage />;

    return (
        <>
            <Sorting setSort={setSort} setOrder={setOrder} />
            <section className="ArticlesList has-background-white">
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
                            <div className="box" key={article_id}>
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
                            </div>
                        );
                    }
                )}
            </section>
        </>
    );
}
