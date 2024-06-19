import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate(); // 훅 설정

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser();
		setEmail("");
		setPassword("");
	};

    /* 노드 서버에게 로그인 정보 전송 */
	const loginUser = () => {
		fetch("http://localhost:4000/api/login", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					alert(data.message);
					navigate("/forum");
					localStorage.setItem("_id", data.id);
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<main className="login">
			<h1 className="loginTitle">로그인</h1>
			<form
				className="loginForm"
				onSubmit={handleSubmit}
			>
				<label htmlFor="email">이메일</label>
				<input
					type="text"
					name="email"
					id="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">비밀번호</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="loginBtn">로그인하기</button>
				<p>
					계정이 없으면 <Link to="/register">회원가입!</Link>
				</p>
			</form>
		</main>
	);
};
export default Login;
