// pages/about.js
import { useState } from "react";
import Router from "next/router";
import DjangoCSRFToken from 'django-react-csrftoken'

import Layout from "../../components/Layout";
import { signup } from "../../requests/userApi";

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignupSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            signup({ name, email, password })
                .then(data => {
                    console.log(data);
                    Router.replace("/auth/login");
                })
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="m-auto w-50 pt-5">
                    <div className="page-separator mb-4">
                        <div className="page-separator__text text-center">
                            <h2>Signup</h2>
                        </div>
                    </div>
                    <div className="card p-5">
                        <div className="card-body">
                            <form onSubmit={onSignupSubmit}>
                                <DjangoCSRFToken/>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        value={name}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        aria-describedby="nameHelp"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        value={email}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        id="password"
                                    />
                                </div>

                                <button type="submit" className="btn btn-secondary btn-block mt-4">
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default Signup;