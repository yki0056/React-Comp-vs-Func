import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    console.log('createContent render!')
    return (
      <article>
        <h2>Createz</h2>
        <form action="/create_process" method="post" onSubmit={function (e) {  //밑에 submit할시 함수발동
          e.preventDefault();
          //console.log(this.props) //<CreateContent></CreateContent>
          //console.log(e.target)   //<form> ... </form>
          this.props.onSubmit(e.target.tit.value, e.target.dsc.value);
          alert('submit되었습니다')
        }.bind(this)} >
          <p><input type="text" name="tit" placeholder="타이틀"></input></p>
          <p><textarea name="dsc" placeholder="디스크립션"></textarea></p>
          <p><input type="submit" value="눌러!"></input></p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
