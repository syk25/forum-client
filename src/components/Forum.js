import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./../Forum.css"; // 스타일링 파일

function Forum() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const postsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const response = await fetch("http://localhost:4000/api/posts");
        const data = await response.json();
        setPosts(data);
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const displayedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

    return (
        <>
            <Nav />
            <div className="home">
                <h1 className="homeTitle">자유게시판</h1>
                <button className="modalBtn" onClick={() => navigate("/create-post")}>
                    게시글 작성
                </button>
                <div className="home__container" id="post-list">
                    {displayedPosts.map((post) => (
                        <div key={post._id} className="thread__item post">
                            <div>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="pagination" className="homeForm">
                    {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                        <button className="homeBtn" key={i + 1} onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Forum;
