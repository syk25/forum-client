import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Replies from "./components/Replies";
import Forum from "./components/Forum";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost"; // 게시글 작성 페이지
import EditPost from "./components/EditPost";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/:id/replies" element={<Replies />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/edit-post/:id" element={<EditPost />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
