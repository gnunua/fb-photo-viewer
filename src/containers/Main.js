import React, {Component} from "react";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
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

    statusChangeCallback(response) {
        this.props.setConnectionStatus(response);
        this.props.checkDeclinedPermissions();
        this.props.fetchPhotos();
    }

    loginHandler() {
        let self = this;
        window.FB.login(function (response) {
            self.props.setConnectionStatus(response);
            if (response.authResponse) {
                self.props.checkDeclinedPermissions();
                self.props.fetchPhotos();

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
    fetchPhotos: PropTypes.func.isRequired,
    setConnectionStatus: PropTypes.func.isRequired,
    checkDeclinedPermissions: PropTypes.func.isRequired,
    success: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    hasDeclinedPermission: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    ownProps,
    ...appCoreSelector(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPhotos,
    setConnectionStatus,
    checkDeclinedPermissions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);