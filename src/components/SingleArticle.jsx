import { useEffect, useState } from "react";
import * as api from "../api";
import { useParams } from "react-router-dom";

export default function SingleArticle() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>loading..</p>;

  return (
    <article className="bg-light-gray center mw6 ba b--black-10 mv4 outline w-80 pa5">
      <h3 className="dark-blue">{article.title}</h3>
      <dl>
        <dt className="b ttc">{article.topic}</dt>
        <dt className="pa3">By: {article.author}</dt>
        <dd className="pa2 tj">{article.body}</dd>
        <dt className="pa2">Kudos: {article.votes}</dt>
        <dt className="pa2">Comments: {article.comment_count}</dt>
        <dt className="pa2">{article.created_at.slice(0, 10)}</dt>
      </dl>
    </article>
  );
}
