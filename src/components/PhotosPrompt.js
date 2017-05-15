import React, {Component} from "react";
import {connect} from "react-redux";
import Loader from "./Loader";
import {photosPromptSelector} from "../selectors";

class PhotosPrompt extends Component {
    render() {
        const renderPhotos = () => {
            const {photos, isLoaded, loggedIn} = this.props;
            if (!loggedIn) {
                return (null);
            }

            if (!isLoaded) {
                return (
                    <Loader/>
                );
            }
            return photos.map(({id, url}) => {
                return (
                    <div className="col-md-4" key={id}>
                        <img src={url} className="img-responsive img-rounded"/>
                    </div>
                );
            });
        };

        return (
            <div>
                {renderPhotos()}
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        ...photosPromptSelector(state)
    };
};

export default connect(mapStateToProps)(PhotosPrompt);
