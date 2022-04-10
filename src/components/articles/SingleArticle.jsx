import { useEffect, useState } from "react";
import * as api from "../../utils/api.js";
import { useParams } from "react-router-dom";
import Comments from "../comments/Comments.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ErrorPage from "../error/ErrorPage.jsx";

export default function SingleArticle() {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [pageErr, setPageErr] = useState(null);
    const [voteChange, setVoteChange] = useState(0);
    const { article_id } = useParams();
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        api.getArticleById(article_id)
            .then((article) => {
                setArticle(article);
                setIsLoading(false);
                setPageErr(null);
            })
            .catch((error) => {
                setPageErr(error);
                setIsLoading(false);
            });
    }, [article_id]);

    const handleClick = (article_id, votesNumber) => {
        if (!loggedInUser.username) {
            return setErr("You need to be logged in to vote!");
        }
        setVoteChange((currentVote) => {
            return (currentVote += votesNumber);
        });
        setArticle((article) => {
            const articleCopy = { ...article };
            articleCopy.votes += votesNumber;
            setErr(null);
            return articleCopy;
        });
        api.patchArticleKudos(article_id, votesNumber).catch((err) => {
            setArticle((article) => {
                const articleCopy = { ...article };
                articleCopy.votes -= votesNumber;
                setErr("Something went wrong, please try again.");
                return articleCopy;
            });
        });
    };

    if (isLoading) return <p>loading..</p>;
    if (pageErr) return <ErrorPage />;

    return (
        <div className="column is-half is-offset-one-quarter">
            <article className="box">
                <h3 className="card-header-title is-centered">
                    {article.title}
                </h3>
                <dl>
                    <dt className="is-uppercase">{article.topic}</dt>
                    <dt className="has-text-weight-bold">
                        By: {article.author}
                    </dt>
                    <dt>{article.created_at.slice(0, 10)}</dt>
                    <dd>{article.body}</dd>
                    <section>
                        <h4 className="is-size-4">Kudos: {article.votes}</h4>
                        <button
                            className="button is-primary is-outlined mx-4"
                            disabled={voteChange >= 1}
                            onClick={() => handleClick(article_id, 1)}
                        >
                            Add kudos
                        </button>
                        <button
                            className="button is-primary is-outlined mx-4"
                            disabled={voteChange <= -1}
                            onClick={() => handleClick(article_id, -1)}
                        >
                            Take kudos
                        </button>
                        {err ? (
                            <p className="notification is-danger is-light">
                                {err}
                            </p>
                        ) : null}
                    </section>
                </dl>
                <h4 className="is-size-4">Comments: {article.comment_count}</h4>
                <Comments article_id={article_id} />
            </article>
        </div>
    );
}
