import { useEffect, useState } from "react";
import * as api from "../utils/api.js";
import { useParams } from "react-router-dom";
import CommentAdder from "./CommentAdder.jsx";

export default function CategoryList() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    api.getCommentsByArticle(article_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>loading..</p>;
  return (
    <section>
      <CommentAdder setComments={setComments} article_id={article_id} />
      {comments.map(({ body, author, votes, created_at, comment_id }) => {
        return (
          <article key={comment_id} className="bg-white center mw6 ba bw1 mv4">
            <h4>{author}</h4>
            <dl>
              <dd className="ma2 tj">{body}</dd>
              <dt>Votes: {votes}</dt>
              {/* <dt>{created_at.slice(0, 10)}</dt> */}
            </dl>
          </article>
        );
      })}
    </section>
  );
}
