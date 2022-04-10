import axios from "axios";

const news = axios.create({
    baseURL: "https://nc-news-backend1.herokuapp.com/api",
});

export const getTopics = () => {
    return news.get(`/topics`).then(({ data: { topics } }) => {
        return topics;
    });
};
export const getArticles = (slug, sort, order) => {
    return news
        .get(`/articles`, {
            params: { topic: slug, sort_by: sort, order: order },
        })
        .then(({ data: { articles } }) => {
            return articles;
        });
};

export function fetchSortedArticlesByParams(params) {
    return news
        .get(`/articles?sort_by=${params[0]}&order=${params[1]}`)
        .then((response) => {
            return response.data;
        });
}

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

export function deleteComment(comment_id) {
    return news.delete(`/comments/${comment_id}`).then((response) => {
        return response.data;
    });
}
