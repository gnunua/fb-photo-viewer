import React, {Component} from "react";
import {connect} from "react-redux";

class PhotosPrompt extends Component {
    render() {
        const renderPhotos = () => {
            return this.props.photos.map(({id, url}) => {

                return (
                    <div className="col-md-4" key={id}>
                        <img src={url} className="img-responsive img-rounded"/>
                    </div>
                );
            });
        };

        return (
                <div className="bg-success">
                    {renderPhotos()}
                </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        photos: state.photos.fetchedData
    };
};

export default connect(mapStateToProps)(PhotosPrompt);
