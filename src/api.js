import axios from "axios";

const news = axios.create({
  baseURL: "https://nc-news-example-seminar-3-13.herokuapp.com/api",
});

export const getTopics = () => {
  return news.get(`/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = () => {
  return news.get(`/articles`).then(({ data: { articles } }) => {
    return articles;
  });
};
