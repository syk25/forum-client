import React, { useState } from "react";
import "./../App.css"; // 스타일링 파일

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { email, username, password };

        try {
            const response = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                throw new Error("Failed to register user");
            }
            alert("Registration successful");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="register">
            <h2 className="registerTitle">회원가입</h2>
            <form className="registerForm" onSubmit={handleSubmit}>
                <input
                    className="modalInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    required
                />
                <input
                    className="modalInput"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="사용자 이름"
                    required
                />
                <input
                    className="modalInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                />
                <button className="registerBtn" type="submit">
                    가입하기
                </button>
            </form>
        </div>
    );
}

export default Register;
