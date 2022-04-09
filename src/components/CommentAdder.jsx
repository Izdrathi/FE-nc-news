import React, { useState } from "react";
import * as api from "../utils/api.js";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

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
            username: "jessjelly",
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
                setErr(true);
            });
    };

    if (!loggedInUser.username) {
        return (
            <div>
                <p> You need to be logged in to post comments</p>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="db">
                    Add your comment:
                    <textarea
                        className="db center ma1"
                        value={comment}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {err ? <h4 className="red">Your comment was not posted</h4> : null}
        </>
    );
}
