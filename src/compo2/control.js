import React, { Component } from 'react';

class Control extends Component {
    render() {
        return (
            <ul>
                <button onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)}>Create</button>
                <button onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}>Update</button>
                <button onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('delete');
                }.bind(this)}>Delete</button>
            </ul>
        )
    }
}

export default Control;