import React from "react";
import { useState, useEffect } from "react";
import * as api from "../utils/api.js";
import ArticleCard from "./ArticleCard.jsx";

const SortedArticles = () => {
    const [sortParameters, setSortParameters] = useState("created_at");
    const [orderParameters, setOrderParameters] = useState("DESC");
    const [submitParamters, setSubmitParameters] = useState();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setError] = useState(null);

    useEffect(() => {
        if (submitParamters) {
            setIsLoading(true);
            api.fetchSortedArticlesByParams(submitParamters)
                .then(({ articles }) => {
                    setArticles(articles);
                    setIsLoading(false);
                })
                .catch(({ err }) => {
                    setError(err);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [submitParamters]);

    const handleChangeSort = (event) => {
        setSortParameters(event.target.value);
    };

    const handleChangeOrder = (event) => {
        setOrderParameters(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitParameters([sortParameters, orderParameters]);
    };

    const handleClear = () => {
        setSubmitParameters(null);
    };

    if (isLoading) return <p>loading..</p>;
    if (err) return <p>{err}</p>;

    return (
        <div>
            <form onSubmit={handleSubmit} onReset={handleClear}>
                <label>Choose articles by:</label>
                <select value={sortParameters} onChange={handleChangeSort}>
                    <option value="created_at">Date</option>
                    <option value="votes">Kudos</option>
                    <option value="title">Title</option>
                    <option value="topic">Topic</option>
                </select>
                <label>Choose order by:</label>
                <select value={orderParameters} onChange={handleChangeOrder}>
                    <option value="ASC"> Ascending</option>
                    <option value="DESC"> Descending</option>
                </select>
                <button type="submit"> Submit</button>
                <button type="reset"> Clear</button>
            </form>
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
        </div>
    );
};

export default SortedArticles;
