import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./../Forum.css"; // 스타일링 파일
import "./../index.css"; // 스타일링 파일

function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState({ title: "", content: "" });
    const navigate = useNavigate();

    useEffect(() => {
        loadPost();
    }, []);

    const loadPost = async () => {
        const response = await fetch(`http://localhost:4000/api/posts/${id}`);
        const data = await response.json();
        setPost({ title: data.title, content: data.content });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:4000/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
        navigate(`/forum`);
    };

    return (
        <>
            <Nav />
            <div className="edit-post">
                <h1>Edit Post</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Content:</label>
                        <textarea
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    );
}

export default EditPost;
