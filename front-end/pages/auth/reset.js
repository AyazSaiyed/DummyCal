import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { resetRequest } from "../../requests/userApi";
import Router from "next/router";

const Reset = () => {
    const [email, setEmail] = useState("");

    const onResetSubmit = (e) => {
        e.preventDefault();
        if(email) {
            resetRequest({ email })
                .then(data => {
                    if(data.status == 'OK') {
                        Router.replace('/auth/confirm');
                    }
                });
        }
    }

    return <Layout>
        <div className="container">
            <div className="m-auto w-50 pt-5">
                <div className="page-separator mb-4">
                    <div className="page-separator__text">Insert Your Email</div>
                </div>
                <div className="card p-5">
                    <div className="card-body">
                        <form onSubmit={onResetSubmit}>
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

                            <button type="submit" className="btn btn-secondary btn-block mt-4">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}

export default Reset