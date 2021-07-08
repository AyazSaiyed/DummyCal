// components/NavBar.js

import "./NavBar.scss";
import NavButton from "./NavButton";

import useUser from "../data/useUser";
import { logout } from "../requests/userApi";
import Router from "next/router";

const NavBar = props => {
    const { loading, loggedIn, user, mutate } = useUser();

    const LoginOrInfo = () => {
        if (loading) return null;
        if (loggedIn)
            return (
                <div className="NavBar">
                    {/* <span className="form-label">Signed in as: {user.firstName} {user.lastName}</span> */}
                    <NavButton
                        key="dashboard"
                        path="/pursuits/dashboard"
                        label="Dashboard"
                    />
                    <button
                        className="btn NavButton"
                        style={{paddingTop: 12, fontSize: 15}}
                        onClick={async () => {
                            await logout();
                            mutate();
                            Router.replace("/auth/login");
                        }}
                    >
                        {" "}
                        Logout{" "}
                    </button>
                </div>
            );

        if (!loggedIn)
            return (
                <div className="NavBar">
                    {props.navButtons.map(button => (
                        <NavButton
                            key={button.path}
                            path={button.path}
                            label={button.label}
                            icon={button.icon}
                        />
                    ))}
                </div>
            );
    };

    return (
        <div className="NavBar">
           <LoginOrInfo />
        </div>
    );
};

export default NavBar;