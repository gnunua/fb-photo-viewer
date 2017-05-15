import React from "react";
import PropTypes from 'prop-types';

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

Header.propTypes = {
    title: PropTypes.string.isRequired,
    loginHandler: PropTypes.func.isRequired
};

export default Header;