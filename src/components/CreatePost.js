import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css"; // 스타일링 파일

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, content };

        await fetch("http://localhost:4000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });

        navigate("/");
    };

    return (
        <div className="createPost">
            <h2>게시글 작성</h2>
            <form className="registerForm" onSubmit={handleSubmit}>
                <input
                    className="modalInput"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    required
                />
                <textarea
                    className="modalInput"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용"
                    required
                />
                <button className="registerBtn" type="submit">
                    작성
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
