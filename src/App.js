import React, { useState } from "react";
import "./App.css";
import Header from "./components/main/Header.jsx";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/articles/ArticlesList.jsx";
import Nav from "./components/main/Nav.jsx";
import SingleArticle from "./components/articles/SingleArticle.jsx";
import ErrorPage from "./components/error/ErrorPage.jsx";
import { UserContext } from "./context/UserContext.js";
import Footer from "./components/main/Footer";
import Topics from "./components/topics/Topics";

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
                    <Route path={"/articles/:slug"} element={<Topics />} />
                    <Route
                        path={"/articles=:article_id"}
                        element={<SingleArticle />}
                    />
                    <Route path={"*"} element={<ErrorPage />} />
                </Routes>
                <Footer />
            </div>
        </UserContext.Provider>
    );
}

export default App;
