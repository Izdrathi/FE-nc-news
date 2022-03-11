import { useEffect, useState } from "react";
import * as api from "../utils/api.js";
import { useParams } from "react-router-dom";
import Comments from "./Comments.jsx";

export default function SingleArticle() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const { article_id } = useParams();

  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  console.log(voteChange);
  const handleClick = (article_id, votesNumber) => {
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

  return (
    <article className="bg-washed-blue center mw6 ba b--black-10 mv4 w20 outline pa1">
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
          {err ? <p>{err}</p> : null}
        </section>
      </dl>
      <h3>Comments: {article.comment_count}</h3>
      <Comments article_id={article_id} />
    </article>
  );
}
