import React, { useState } from "react";
import * as api from "../../utils/api.js";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function CommentAdder({ setComments, article_id }) {
    const [comment, setComment] = useState("");
    const [err, setErr] = useState(false);
    const { loggedInUser } = useContext(UserContext);

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newComment = {
            username: loggedInUser.username,
            body: comment,
        };
        setErr(false);
        setComment("");

        api.postComments(article_id, newComment)
            .then((returnedComment) => {
                setComments((currentComments) => {
                    return [returnedComment, ...currentComments];
                });
            })
            .catch((err) => {
                setErr(err);
            });
    };

    if (!loggedInUser.username) {
        return (
            <div>
                <p className="notification is-danger is-light">
                    You need to be logged in to post comments
                </p>
            </div>
        );
    }

    return (
        <>
            <form className="pt-5 pb-5" onSubmit={handleSubmit}>
                <label className="is-underlined is-size-4">
                    Add your comment:
                    <textarea
                        className="textarea pb-5"
                        value={comment}
                        onChange={handleChange}
                    />
                </label>
                <button className="button is-primary is-outlined" type="submit">
                    Submit
                </button>
            </form>
            {err ? <h4>Your comment was not posted</h4> : null}
        </>
    );
}
