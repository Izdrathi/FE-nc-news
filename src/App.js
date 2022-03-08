import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList.jsx";
import Nav from "./components/Nav.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path={"/articles/:slug"} element={<ArticlesList />} />
      </Routes>
    </div>
  );
}

export default App;
