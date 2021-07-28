import React, { Component } from 'react';

class Subject extends Component {
  render() {
    //이곳에서의 this는 // Subject { props{...} }   // App.js안에있는 <Subject>...</Subject>인듯.
    //props: {title1: "WEB", sub1: "World wide Web!", onChangePage: ƒ}
    //링크를 클릭하면, 기본행동막고, //<Subject>안 props{...} 안에있는 onChangePage()함수 발동시켜라!
    return (
      <header>
        <h1><a href='/' onClick={function (e) {
          e.preventDefault();
          this.props.onChangePage();  //this.props에있는 onChangePage함수발동!
        }.bind(this)}
        >{this.props.title1}</a>
        </h1>
        <p>{this.props.sub1}</p>
      </header>
    );
  }
}

export default Subject;
