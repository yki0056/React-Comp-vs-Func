import React, { Component } from 'react';

class Create extends Component {
    render() {
        return (
            <div>
                <h2>Create New 브랜드</h2>
                <form action='#' method='post' onSubmit={function (e) {
                    e.preventDefault(); // e.target는<form>태그  ,  e.target.newBrand는<input name='newBrand'>태그
                    var bArg = e.target.newBrand.value;
                    var dArg = e.target.newDesc.value;
                    this.props.submitInfo(bArg, dArg)
                }.bind(this)}>
                    <p><input type='text' name='newBrand' placeholder='생성할브랜드를입력하시요'></input></p>
                    <p><textarea name='newDesc' placeholder='가격이 얼마입니까'></textarea></p>
                    <p><input type='submit' value='눌러라'></input></p>
                </form>
            </div >
        )
    }
}

export default Create;
