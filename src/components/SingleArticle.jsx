import { useEffect, useState } from "react";
import * as api from "../utils/api.js";
import { useParams } from "react-router-dom";
import Comments from "./Comments.jsx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ErrorPage from "./ErrorPage.jsx";

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
        <article className="bg-white center mw6 ba b--black-10 mv4 w20 outline pa1">
            <h3 className="darkest-blue">{article.title}</h3>
            <dl>
                <dt className="b ttc">{article.topic}</dt>
                <dt className="pa3">By: {article.author}</dt>
                <dt className="pa2">{article.created_at.slice(0, 10)}</dt>
                <dd className="pa2 tl">{article.body}</dd>
                <section>
                    <h3 className="pa2">Kudos: {article.votes}</h3>
                    <button
                        className="ma2"
                        disabled={voteChange >= 1}
                        onClick={() => handleClick(article_id, 1)}
                    >
                        Add kudos
                    </button>
                    <button
                        className="ma2"
                        disabled={voteChange <= -1}
                        onClick={() => handleClick(article_id, -1)}
                    >
                        Take kudos
                    </button>
                    {err ? <p className="red">{err}</p> : null}
                </section>
            </dl>
            <h3>Comments: {article.comment_count}</h3>
            <Comments article_id={article_id} />
        </article>
    );
}
