import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./../Forum.css"; // 스타일링 파일

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보
    const navigate = useNavigate();

    useEffect(() => {
        loadPost();
        // 가정: 현재 사용자 정보를 가져오는 함수
        loadCurrentUser();
    }, []);

    const loadPost = async () => {
        const response = await fetch(`http://localhost:4000/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
    };

    const loadCurrentUser = async () => {
        // 실제 구현에 맞게 사용자 정보를 가져오는 코드를 추가
        const user = await fetchCurrentUser();
        setCurrentUser(user);
    };

    const fetchCurrentUser = async () => {
        // 실제 사용자 정보를 가져오는 API를 호출
        const response = await fetch("http://localhost:4000/api/current-user");
        const data = await response.json();
        return data;
    };

    const handleEdit = () => {
        navigate(`/edit-post/${id}`);
    };

    const handleDelete = async () => {
        await fetch(`http://localhost:4000/api/posts/${id}`, {
            method: "DELETE",
        });
        navigate("/");
    };

    if (!post) return <div>Loading...</div>;

    return (
        <>
            <Nav />
            <div className="post-detail">
                <h1 className="post-title-detail">{post.title}</h1>
                <p className="post-content-detail">{post.content}</p>
                {currentUser && currentUser.id === post.authorId && (
                    <div className="post-actions">
                        <button className="edit-btn" onClick={handleEdit}>수정</button>
                        <button className="delete-btn" onClick={handleDelete}>삭제</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default PostDetail;
