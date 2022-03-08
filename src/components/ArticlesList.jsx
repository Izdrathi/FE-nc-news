import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import * as api from "../api";
import { useParams } from "react-router-dom";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    api.getArticles(slug).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) return <p>loading..</p>;
  return (
    <section className="ArticlesList">
      {articles.map(
        ({
          article_id,
          title,
          body,
          topic,
          author,
          votes,
          created_at,
          comment_count,
        }) => {
          return (
            <ArticleCard
              key={article_id}
              article_id={article_id}
              title={title}
              body={body}
              topic={topic}
              author={author}
              votes={votes}
              created_at={created_at}
              comment_count={comment_count}
            />
          );
        }
      )}
    </section>
  );
}
