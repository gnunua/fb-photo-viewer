import React from "react";
import PropTypes from 'prop-types';

import Title from "./Title";
import SignInButton from "./SignInButton";

const Header = ({title, loginHandler, btnMeassage}) => {
    return (
        <div className="bg-success" style={{
            padding: '20px',
            textAlign: 'center'
        }}>
            <Title title={title}/>
            <SignInButton onSignIn={loginHandler} message={btnMeassage}/>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    loginHandler: PropTypes.func.isRequired,
    btnMeassage: PropTypes.string.isRequired
};

export default Header;