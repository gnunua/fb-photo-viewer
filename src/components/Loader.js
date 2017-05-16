import React, {Component} from 'react';

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
    constructor(props) {
        super(props);
        this.originalText = "Loading";
        this.state = {
            text: this.originalText
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
        setInterval(this.loadingTextModifier, 500);
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

