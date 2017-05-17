import React, {Component} from "react";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import App from "../components/App";
import PhotosPrompt from "./PhotosPrompt";
import {appCoreSelector} from "../selectors";
import Header from "../components/Header";
import {TITLE_ABSENT_OF_PERMISSIONS, TITLE_SIGN_IN, SIGN_IN, GRANT} from "../config/consts";
import {setConnectionStatus, fetchPhotos, fetchGrantedPermissions} from "../actions/index";
import fbApi from "../helpers/fbApi";
import {fbInitConfig} from "../config";

class Main extends Component {

    static propTypes = {
        fetchPhotos: PropTypes.func.isRequired,
        setConnectionStatus: PropTypes.func.isRequired,
        fetchGrantedPermissions: PropTypes.func.isRequired,
        success: PropTypes.bool.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        hasDeclinedPermission: PropTypes.bool.isRequired
    };

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
        this.renderHeader = this.renderHeader.bind(this);
    }

    init() {
        window.fbAsyncInit = function () {
            window.FB.init(fbInitConfig);
            window.FB.AppEvents.logPageView();

            window.FB.getLoginStatus(function (response) {
                this.connectionCallBack(response);
            }.bind(this));
        }.bind(this);
    }

    connectionCallBack(response) {
        this.props.setConnectionStatus(response);
        if (response.authResponse) {
            this.props.fetchGrantedPermissions();
            this.props.fetchPhotos();
        }
    }

    loginHandler() {
        let loginPayload = {scope: 'user_photos', auth_type: 'rerequest'};
        fbApi.login(this.connectionCallBack.bind(this), loginPayload);
    }

    componentDidMount() {
        this.init();
        Main.loadSdk();
    }

    renderHeader() {
        const {hasDeclinedPermission, success, loggedIn} = this.props;
        if (success) {
            return (null);
        } else if (hasDeclinedPermission) {
            return (
                <Header
                    title={TITLE_ABSENT_OF_PERMISSIONS}
                    btnMeassage={GRANT}
                    loginHandler={this.loginHandler}
                />
            );
        } else if (!loggedIn) {
            return (
                <Header
                    title={TITLE_SIGN_IN}
                    btnMeassage={SIGN_IN}
                    loginHandler={this.loginHandler}
                />
            );
        }
    }

    render() {
        return (
            <App>
                {this.renderHeader()}
                <PhotosPrompt/>
            </App>
        );
    }

}

const mapStateToProps = (state, ownProps) => ({
    ownProps,
    ...appCoreSelector(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPhotos,
    setConnectionStatus,
    fetchGrantedPermissions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);