import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css"; // 스타일링 파일

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보
    const navigate = useNavigate();

    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/current-user");
            if (!response.ok) {
                throw new Error("Failed to load current user");
            }
            const data = await response.json();
            setCurrentUser(data);
        } catch (error) {
            console.error("Error loading current user:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("User information is not loaded yet.");
            return;
        }

        const newPost = { title, content, authorId: currentUser.id };

        try {
            const response = await fetch("http://localhost:4000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            if (!response.ok) {
                throw new Error("Failed to create post");
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="createPost">
            <h2 className="createPostTitle">게시글 작성</h2>
            <form className="createPostForm" onSubmit={handleSubmit}>
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
