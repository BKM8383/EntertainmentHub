import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useHistory } from "react-router-dom";
const Login = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submitl(e) {
        e.preventDefault();

        try {

            await axios.post("http://localhost:8000/", {
                email, password
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data === "exist") {
                        history.push("/", { state: { id: email } })
                    }
                    else if (res.data == "notexist") {
                        alert("User have not sign up")
                        console.log(res.data);
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }

    async function submits(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/signup", {
                email, password
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("User already exists");
                    } else if (res.data === "notexist") {
                        history.push("/", { state: { id: email } });
                    }
                })
                .catch(e => {
                    alert("wrong details");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form action="POST">
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={submitl}>Login</button>
                </form>
            </div>
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form action="POST">
                    <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit" onClick={submits}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
