import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { resetConfirmRequest } from "../../requests/userApi";

const Reset = () => {
    const [password, setPassword] = useState("");

    const onResetConfirmSubmit = (e) => {
        e.preventDefault();
        if(password) {
            resetConfirmRequest({ password })
                .then(data => {
                    console.log(data);
                });
        }
    }

    return <Layout>
        <div className="container">
            <div className="m-auto w-50 pt-5">
                <div className="page-separator mb-4">
                    <div className="page-separator__text">Insert New Password</div>
                </div>
                <div className="card p-5">
                    <div className="card-body">
                        <form onSubmit={onResetConfirmSubmit}>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    autoFocus={true}
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