import React from "react";
import Title from "./Title";
import SignInButton from "./SignInButton";

const Header = ({title, loginHandler}) => {
    return (
        <div className="bg-success">
            <Title title={title}/>
            <SignInButton onSignIn={loginHandler}/>
        </div>
    );
};

export default Header;