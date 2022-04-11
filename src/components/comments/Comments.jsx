import { useEffect, useState } from "react";
import * as api from "../../utils/api.js";
import { useParams } from "react-router-dom";
import CommentAdder from "./CommentAdder.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ErrorPage from "../error/ErrorPage.jsx";

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { article_id } = useParams();
    const { loggedInUser } = useContext(UserContext);
    const [err, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        api.getCommentsByArticle(article_id)
            .then((comments) => {
                setComments(comments);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
            });
    }, [article_id]);

    const handleDelete = (event) => {
        event.preventDefault();
        const id = event.target.value;

        setComments(() => {
            const commentsNew = comments.filter((comment) => {
                return comment.comment_id !== parseInt(id);
            });
            return commentsNew;
        });

        api.deleteComment(id)
            .then(() => {})
            .catch((err) => {
                setError({ err });
            });
    };

    if (isLoading) return <span className="is-size-2">Loading..</span>;
    if (err) return <ErrorPage />;

    return (
        <section>
            <CommentAdder setComments={setComments} article_id={article_id} />
            {comments.map(({ body, author, votes, created_at, comment_id }) => {
                return (
                    <article className="box" key={comment_id}>
                        <h4 className="has-text-weight-bold">{author}</h4>
                        <dl>
                            <dd>{body}</dd>
                            <dt>Votes: {votes}</dt>
                            <dt>{created_at.slice(0, 10)}</dt>
                            {loggedInUser.username === author ? (
                                <button
                                    className="button is-danger is-small"
                                    value={comment_id}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            ) : null}
                        </dl>
                    </article>
                );
            })}
        </section>
    );
}
