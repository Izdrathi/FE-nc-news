import axios from "axios";

const news = axios.create({
  baseURL: "https://nc-news-example-seminar-3-13.herokuapp.com/api",
});

export const getTopics = () => {
  return news.get(`/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = (topic) => {
  if (topic) {
    return news
      .get(`/articles?topic=${topic}`)
      .then(({ data: { articles } }) => {
        return articles;
      });
  } else {
    return news.get(`/articles`).then(({ data: { articles } }) => {
      return articles;
    });
  }
};

export const getArticleById = (article_id) => {
  return news.get(`/articles/${article_id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const patchArticleKudos = (articleId, kudos) => {
  return news
    .patch(`/articles/${articleId}`, { inc_votes: kudos })
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getCommentsByArticle = (article_id) => {
  return news
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postComments = (article_id, comment) => {
  return news
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data: { comment } }) => {
      return comment;
    });
};
