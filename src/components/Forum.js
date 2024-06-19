import React, { useState, useEffect } from 'react';
import './../Forum.css'; // 스타일링 파일

function Forum() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const response = await fetch('http://localhost:4000/api/posts');
        const data = await response.json();
        setPosts(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, content };

        await fetch('http://localhost:4000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        loadPosts();
        setTitle('');
        setContent('');
        closeModal();
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const displayedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

    const openModal = () => {
        document.getElementById('modal').style.display = 'block';
    };

    const closeModal = () => {
        document.getElementById('modal').style.display = 'none';
    };

    return (
        <div className="container">
            <h1>자유게시판</h1>
            <button onClick={openModal}>게시글 작성</button>
            <div id="post-list">
                {displayedPosts.map((post) => (
                    <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
            <div id="pagination">
                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                ))}
            </div>

            <div id="modal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>게시글 작성</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목"
                            required
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용"
                            required
                        />
                        <button type="submit">작성</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forum;
