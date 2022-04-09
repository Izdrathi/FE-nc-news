import { useEffect, useState } from "react";
import * as api from "../utils/api.js";
import { useParams } from "react-router-dom";
import CommentAdder from "./CommentAdder.jsx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

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

    if (isLoading) return <p>loading..</p>;
    if (err) return <p>{err}</p>;

    return (
        <section>
            <CommentAdder setComments={setComments} article_id={article_id} />
            {comments.map(({ body, author, votes, created_at, comment_id }) => {
                return (
                    <article
                        key={comment_id}
                        className="bg-white center mw6 ba bw1 mv4"
                    >
                        <h4>{author}</h4>
                        <dl>
                            <dd className="ma2 tj">{body}</dd>
                            {loggedInUser.username === author ? (
                                <button
                                    className="f6 link br-pill ph3 pv2 mb2 dib black bg-washed-red pointer"
                                    value={comment_id}
                                    onClick={handleDelete}
                                >
                                    Delete comment
                                </button>
                            ) : null}
                            <dt>Votes: {votes}</dt>
                            <dt>{created_at.slice(0, 10)}</dt>
                        </dl>
                    </article>
                );
            })}
        </section>
    );
}
