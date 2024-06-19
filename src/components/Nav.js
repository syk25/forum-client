import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const navigate = useNavigate(); // navigate 함수 정의 - 훅은 컴포논트 함수 내부에서만 호출 될 수 있다.

	const signOut = () => {
		localStorage.removeItem("_id");
		navigate("/");
	};

	const goToForum = () => {
		navigate("/forum");
	};

	return (
		<nav className="navbar">
			<h2>정글 게시판</h2>
			<div className="navbarCenter">
				<button onClick={goToForum}>자유게시판</button>
			</div>
			<div className="navbarRight">
				<button onClick={signOut}>로그아웃</button>
			</div>
		</nav>
	);
};

export default Nav;
