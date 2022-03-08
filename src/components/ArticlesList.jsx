import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import * as api from "../api";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getArticles().then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

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
