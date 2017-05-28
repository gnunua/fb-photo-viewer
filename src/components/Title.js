import React from "react";
import PropTypes from 'prop-types';

const Title = ({title}) => {
    return (
        <div>
            <h3
                className="text-primary"
                style={{margin: '15px'}}>
                {title}
            </h3>
        </div>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired
};

export default Title;
