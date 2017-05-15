import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import App from "../components/App";
import PhotosPrompt from "./PhotosPrompt";
import {APP_ID, GRAPH_API_VERSION} from "../config";
import {appCoreSelector} from "../selectors";
import Header from "../components/Header";
import {TITLE_ABSENT_OF_PERMISSIONS, TITLE_SIGN_IN} from "../config/consts";
import {setConnectionStatus, fetchPhotos, checkDeclinedPermissions} from "../actions/index";

class Main extends Component {
    static loadSdk() {
        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
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
            window.FB.init({
                appId: APP_ID,
                cookie: true,
                xfbml: true,
                version: GRAPH_API_VERSION
            });

            window.FB.AppEvents.logPageView();

            window.FB.getLoginStatus(function (response) {
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);
    }

    getPhotos() {
        this.props.dispatch(fetchPhotos());
    }

    statusChangeCallback(response) {
        this.props.dispatch(setConnectionStatus(response));
        this.props.dispatch(checkDeclinedPermissions());
        this.getPhotos();
    }

    loginHandler() {
        let self = this;
        window.FB.login(function (response) {
            self.props.dispatch(setConnectionStatus(response));
            if (response.authResponse) {
                self.props.dispatch(checkDeclinedPermissions());
                self.getPhotos();

            } else {
                console.warn('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'user_photos', auth_type: 'rerequest'});
    }

    componentDidMount() {
        this.init();
        Main.loadSdk();
    }

    render() {
        const {hasDeclinedPermission, success, loggedIn} = this.props;

        const renderHeader = () => {
            if (success) {
                return (null);
            } else if (hasDeclinedPermission) {
                return (
                    <Header
                        title={TITLE_ABSENT_OF_PERMISSIONS}
                        loginHandler={this.loginHandler}
                    />
                );
            } else if (!loggedIn) {
                return (
                    <Header
                        title={TITLE_SIGN_IN}
                        loginHandler={this.loginHandler}
                    />
                );
            }
        };

        return (
            <App>
                {renderHeader()}
                <PhotosPrompt/>
            </App>
        );
    }

}

Main.propTypes = {
    success: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    hasDeclinedPermission: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        ...appCoreSelector(state)
    };
};
export default connect(mapStateToProps)(Main);