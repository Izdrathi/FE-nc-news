import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList.jsx";
import Nav from "./components/Nav.jsx";
import SingleArticle from "./components/SingleArticle.jsx";
import SortedArticles from "./components/SortedArticles.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { UserContext } from "./context/UserContext.js";

function App() {
    const [loggedInUser, setLoggedInUser] = useState("");

    return (
        // state is passed in the app for every component to access
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            <div className="App">
                <Header />
                <Nav />
                <Routes>
                    <Route path="/" element={<ArticlesList />} />
                    <Route
                        path={"/articles/:slug"}
                        element={<ArticlesList />}
                    />
                    <Route
                        path={"/articles/sort/:sortedby"}
                        element={<SortedArticles />}
                    />
                    <Route
                        path={"/articles=:article_id"}
                        element={<SingleArticle />}
                    />
                    <Route path={"*"} element={<ErrorPage />} />
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;
