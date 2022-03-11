import React, { useState } from "react";
import * as api from "../utils/api.js";

export default function CommentAdder({ setComments, article_id }) {
  const [comment, setComment] = useState("");
  const [err, setErr] = useState(false);

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

    api
      .postComments(article_id, newComment)
      .then((returnedComment) => {
        setComments((currentComments) => {
          return [returnedComment, ...currentComments];
        });
      })
      .catch((err) => {
        setErr(true);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Add your comment:
          <textarea value={comment} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {err ? <h4>Your comment was not posted</h4> : null}
    </>
  );
}
