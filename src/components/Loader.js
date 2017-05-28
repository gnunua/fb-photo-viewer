import React, {Component} from 'react';
import PropTypes from 'prop-types';

const styles = {

    container: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        fontSize: '60px'
    },
    content: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        marginTop: '35px',
        color: 'cornflowerblue'
    }
};

class Loader extends Component {
    static defaultProps = {
        text: 'Loading',
        speed: 200
    };

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.originalText = this.props.text;
        this.state = {
            text: this.props.text
        };
        this.loadingTextModifier = this.loadingTextModifier.bind(this);
    }

    loadingTextModifier() {
        let stopper = this.originalText + '...';
        if (this.state.text === stopper) {
            this.setState({
                text: this.originalText
            });
        } else {
            this.setState({
                text: this.state.text + '.'
            });
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.loadingTextModifier, this.props.speed);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div style={styles.container}>
                <p style={styles.content}>
                    {this.state.text}
                </p>
            </div>
        );
    }
}

export default Loader;

