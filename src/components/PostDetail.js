import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import "./../Forum.css"; // 스타일링 파일

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        loadPost();
    }, []);

    const loadPost = async () => {
        const response = await fetch(`http://localhost:4000/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
    };

    if (!post) return <div>Loading...</div>;

    return (
        <>
            <Nav />
            <div className="post-detail">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </div>
        </>
    );
}

export default PostDetail;
