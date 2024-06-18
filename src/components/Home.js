import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../utils/Comments"; // 경로 설정 주의!
import Likes from "../utils/Like"; // 경로 설정 주의!


import Nav from "./Nav";

const Home = () => {
	const [thread, setThread] = useState("");
	const navigate = useNavigate();

	// 사용자가 인가되었는지 확인
	useEffect(() => {
		const checkUser = () => {
			if (!localStorage.getItem("_id")) {
				navigate("/");
			} else {
				fetch("http://localhost:4000/api/all/threads")
					.then((res) => res.json())
					.then((data) => setThreadList(data.threads))
					.catch((err) => console.error(err));
			}
		};
		checkUser();
	}, [navigate]);

	/* state: 포스트 보관 */
	const [threadList, setThreadList] = useState([]);

	const createThread = () => {
		fetch("http://localhost:4000/api/create/thread", {
			method: "POST",
			body: JSON.stringify({
				thread,
				userId: localStorage.getItem("_id"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.message);
				setThreadList(data.threads);
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createThread(); // 스레드 생성 함수 호출
		setThread("");
	};

	return (
		<>
			<Nav />
			<main className="home">
				<h2 className="homeTitle">Create a Thread</h2>
				<form
					className="homeForm"
					onSubmit={handleSubmit}
				>
					{/*--form UI elements--*/}
				</form>

				<div className="thread__container">
					{threadList.map((thread) => (
						<div
							className="thread__item"
							key={thread.id}
						>
							<p>{thread.title}</p>
							<div className="react__container">
								<Likes
									numberOfLikes={thread.likes.length}
									threadId={thread.id}
								/>
								<Comments
									numberOfComments={thread.replies.length}
									threadId={thread.id}
									title={thread.title}
								/>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Home;
