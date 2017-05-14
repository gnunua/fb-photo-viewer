import React from "react";
import App from "./App";
import {connect} from "react-redux";
import UserStatus from "./UserStatus";

import {APP_ID, GRAPH_API_VERSION} from "../config";
import {setConnectionStatus, fetchPhotos} from "../actions/index";

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
        this.loginHandler = this.loginHandler.bind(this);
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

            FB.getLoginStatus(function (response) {
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);
    }

    getPhotos() {
        this.props.dispatch(fetchPhotos());
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        this.props.dispatch(setConnectionStatus(response));
        this.getPhotos();
    }

    loginHandler() {
        let self = this;

        FB.login(function(response) {

            self.props.dispatch(setConnectionStatus(response));

            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');

                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });

                self.getPhotos();

            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'user_photos'});
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
                <button onClick={this.loginHandler}>
                    login
                </button>
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