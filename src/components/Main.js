import React from "react";
import App from "./App";
import {connect} from "react-redux";
import UserStatus from "./UserStatus"

import {APP_ID, GRAPH_API_VERSION} from "../config";
import {setConnectionStatus} from "../actions/index";

class Main extends React.Component {

    static loadSdk() {
        (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    constructor(props) {
        super(props);
        this.init = this.init.bind(this);

    }

    init() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: APP_ID,
                cookie: true,
                xfbml: true,
                version: GRAPH_API_VERSION
            });

            FB.AppEvents.logPageView();

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.
            FB.getLoginStatus(function (response) {
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);
    }

    statusChangeCallback(response) {

        console.log('statusChangeCallback');
        console.log(response);

        this.props.dispatch(setConnectionStatus(response));

        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
           // this.testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {

            this.props.dispatch(setConnectionStatus(response.status));
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log' +
                'into Facebook.';
        }
    }

    componentDidMount() {
        this.init();
        Main.loadSdk();
    }

    render() {
        return (
            <App>
                Hello world
                <UserStatus status = {this.props.status} />
            </App>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        status: state.appStatus.status
    };
};
export default connect(mapStateToProps)(Main);