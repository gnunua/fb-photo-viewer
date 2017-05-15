import React from "react";
import App from "./App";
import {connect} from "react-redux";
import PhotosPrompt from "./PhotosPrompt";
import {APP_ID, GRAPH_API_VERSION} from "../config";
import ContentWrapper from "./ContentWrapper";
import {setConnectionStatus, fetchPhotos, checkDeclinedPermissions} from "../actions/index";

class Main extends React.Component {

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
        console.log('statusChangeCallback', response);
        this.props.dispatch(setConnectionStatus(response));
        this.props.dispatch(checkDeclinedPermissions());

        this.getPhotos();
    }

    loginHandler() {
        let self = this;
        FB.login(function (response) {
            self.props.dispatch(setConnectionStatus(response));

            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                self.props.dispatch(checkDeclinedPermissions());

                self.getPhotos();

            } else {

                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'user_photos', auth_type: 'rerequest'});
    }

    componentDidMount() {
        this.init();
        Main.loadSdk();
    }

    render() {
        let {hasDeclinedPermission, status} = this.props;

        const renderHeader = () => {

            if (status === 'connected' && hasDeclinedPermission === false) {
                return (null);
            } else if (status === 'connected' && hasDeclinedPermission === false) {
                return (
                    <div>
                        <h3 className="text-primary">
                            Unable to retrieve photos
                            The required permissions was not granted. Please grant view photos permissions.
                            Press Sign in again to grant.
                        </h3>
                        <button type="button" className="btn btn-primary btn-lg center-block"
                                onClick={this.loginHandler}>
                            Sign in with facebook!
                        </button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h3 className="text-primary">
                            Please sign in with your facebook account and make sure to grant view photos permission
                        </h3>
                        <button type="button" className="btn btn-primary btn-lg center-block"
                                onClick={this.loginHandler}>
                            Sign in with facebook!
                        </button>
                    </div>
                );
            }

        };

        return (
            <App>
                <div className="center-block">
                    <ContentWrapper isLoaded = { !(status === "" && hasDeclinedPermission === null) }>
                        {renderHeader()}
                        <PhotosPrompt/>
                    </ContentWrapper>
                </div>
            </App>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        status: state.appStatus.status,
        hasDeclinedPermission: state.appStatus.hasDeclinedPermission
    };
};
export default connect(mapStateToProps)(Main);