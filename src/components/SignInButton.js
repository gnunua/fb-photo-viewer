import React from "react";
import PropTypes from 'prop-types';

const SignInButton = ({onSignIn, message}) => {
    return (
        <button
            type="button"
            className="btn btn-primary btn-lg center-block"
            onClick={onSignIn}
        >
            {message}
        </button>

    );
};

SignInButton.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export default SignInButton;
