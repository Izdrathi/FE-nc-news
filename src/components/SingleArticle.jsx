import { useEffect, useState } from "react";
import * as api from "../utils/api.js";
import { useParams } from "react-router-dom";

export default function SingleArticle() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  const handleClick = (article_id, votesNumber) => {
    api
      .patchArticleKudos(article_id, votesNumber)
      .then((article) => {
        article.votes += votesNumber;
        setErr(null);
        api.getArticleById(article_id).then((article) => {
          setArticle(article);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setArticle((article) => {
          article.votes -= votesNumber;
          setErr("Something went wrong, please try again.");
        });
      });
  };

  if (err) return <p>{err}</p>;
  if (isLoading) return <p>loading..</p>;

  return (
    <article className="bg-light-gray center mw6 ba b--black-10 mv4 outline w-80 pa5">
      <h3 className="dark-blue">{article.title}</h3>
      <dl>
        <dt className="b ttc">{article.topic}</dt>
        <dt className="pa3">By: {article.author}</dt>
        <dd className="pa2 tj">{article.body}</dd>
        <dt className="pa2">Comments: {article.comment_count}</dt>
        <dt className="pa2">{article.created_at.slice(0, 10)}</dt>
        <section>
          <h4 className="pa2">Kudos: {article.votes}</h4>
          <button className="ma2" onClick={() => handleClick(article_id, 1)}>
            Add kudos
          </button>
          <button className="ma2" onClick={() => handleClick(article_id, -1)}>
            Take kudos
          </button>
        </section>
      </dl>
    </article>
  );
}
