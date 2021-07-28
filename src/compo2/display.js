import React, { Component } from 'react';

class Ddisplay extends Component {
    render() {
        return (
            <nav>
                <h3>{this.props.main}</h3>
                <h4>{this.props.sub}</h4>
            </nav>

        );
    }
}

export default Ddisplay;