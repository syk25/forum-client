import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const navigate = useNavigate(); // navigate 함수 정의 - 훅은 컴포논트 함수 내부에서만 호출 될 수 있다.

	const signOut = () => {
		localStorage.removeItem("_id");
		navigate("/");
	};
	return (
		<nav className="navbar">
			<h2>Threadify</h2>
			<div className="navbarRight">
				<button onClick={signOut}>Sign out</button>
			</div>
		</nav>
	);
};

export default Nav;
