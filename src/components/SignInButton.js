import React from "react";
import PropTypes from 'prop-types';

const SignInButton = ({onSignIn}) => {
    return (
        <button
            type="button"
            className="btn btn-primary btn-lg center-block"
            onClick={onSignIn}
        >
            Sign in with facebook!
        </button>

    );
};

SignInButton.propTypes = {
    onSignIn: PropTypes.func.isRequired
};

export default SignInButton;
