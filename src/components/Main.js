import React from "react";
import App from "./App";
import {connect} from "react-redux";
import PhotosPrompt from "./PhotosPrompt";
import {APP_ID, GRAPH_API_VERSION} from "../config";
import SignInButton from "./SignInButton";
import {setConnectionStatus, fetchPhotos, checkDeclinedPermissions} from "../actions/index";
import {appCoreSelector} from "../selectors";
import Header from "./Title";

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
        this.props.dispatch(setConnectionStatus(response));
        this.props.dispatch(checkDeclinedPermissions());
        this.getPhotos();
    }

    loginHandler() {
        let self = this;
        FB.login(function (response) {
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
        const {hasDeclinedPermission, success, isLoaded, loggedIn} = this.props;

        const renderHeader = () => {

            if (success) {
                return (null);
            } else if (hasDeclinedPermission) {
                return (
                    <div>
                        <Header title={`Unable to retrieve photos
                            The required permissions was not granted. Please grant view photos permissions.
                            Press Sign in again to grant.`}
                        />
                        <SignInButton onSignIn={this.loginHandler}/>
                    </div>
                );
            } else if (!loggedIn) {
                return (
                    <div>
                        <Header
                            title={"Please sign in with your facebook account and make sure to grant view photos permission"}/>
                        <SignInButton onSignIn={this.loginHandler}/>
                    </div>
                );
            }
        };

        return (
            <App>
                {renderHeader()}
                <PhotosPrompt isLoaded={isLoaded}/>
            </App>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        ...appCoreSelector(state),
    };
};
export default connect(mapStateToProps)(Main);