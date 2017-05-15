import React from "react";

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

export default SignInButton;
