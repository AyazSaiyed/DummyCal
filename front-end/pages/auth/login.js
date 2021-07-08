// pages/about.js
import { useState, useEffect } from "react";
import Router from "next/router";

import Layout from "../../components/Layout";
import useUser from "../../data/useUser";
import { login } from "../../requests/userApi";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, loggedIn } = useUser();

    useEffect(() => {
        console.log(loggedIn);
        if (loggedIn) Router.replace("/pursuits/dashboard");
    }, [loggedIn]);

    if (loggedIn) return <> Redirecting.... </>;

    const onLoginSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            login({ email, password })
                .then(data => {
                    mutate();
                })
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="m-auto w-50 pt-5">
                    <div className="page-separator mb-4">
                        <div className="page-separator__text text-center">
                            <h2>Welcome Back!</h2>
                        </div>
                    </div>
                    <div className="card card-body border-0">
                        <form onSubmit={onLoginSubmit}>
                            <div className="form-group mb-4">
                                <input
                                    value={email}
                                    type="text"
                                    className="form-control border-0 bg-main"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="form-control border-0 bg-main"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <button type="submit" className="btn btn-main btn-block">
                                        Login
                                    </button>
                                </div>
                                <div className="col-6">
                                    <p className="text-right mb-0" style={{lineHeight: '36px'}}>
                                        <a href="#" className="small"
                                            onClick={(e) => { Router.replace("/auth/reset") }}
                                            >Forgot your password?
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col-12">
                                    <p className="text-center small" style={{lineHeight: '36px'}}>
                                        Don't Have Account? 
                                        <a href="#" className="ml-2"
                                            onClick={(e) => { Router.replace("/auth/signup") }}
                                            >Register here
                                        </a>
                                    </p>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default Login;