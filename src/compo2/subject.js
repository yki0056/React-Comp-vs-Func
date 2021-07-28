import React, { Component } from 'react';

class Subject extends Component {
    render() {
        return (
            <header>
                <h1>
                    <a href='#' onClick={function (e) {
                        e.preventDefault();
                        this.props.onChangePage();
                    }.bind(this)}
                    >
                        {this.props.title1}
                    </a>
                </h1>
                <p>{this.props.sub1}</p>
            </header>
        );
    }
}


export default Subject;
