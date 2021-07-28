import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {                  //* props로 가져온 정보인 data를 state에다가 넣음
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    }
  }
  inputFormHandler(e) {//CSS클릭뒤 update누르면 제목에 css, 내용에 CSS is for Deisign 라고 기존내용이있음.//제목에 잉 추가하고 내용에 Desgin 지우고 디자인 추가. 
    //console.log(e.target) 첫번째 input에변화를주면 ex) <input type="text" name="title" placeholder="title" value="css잉"> 타자를 칠때마다 바로 콘솔에 변경됨.
    //console.log(e.target) 두번째 input에 변화를 주면 ex) <textarea name="desc" placeholder="description">CSS is for 디자인 </textarea>
    this.setState({ [e.target.name]: e.target.value }); //input에적은 value를 state안에 저장 
    //console.log(this.state) // {id: 2, title: "CSS잉", desc: "CSS is for 디자인"}   
    //최신기술 [e.target.name] 를 사용하는 이유
    //inputFormHandler라는 이벤트함수를 2개의 input에서 같이사용하기 때문에 e.target.value값마저도 공유해버림   
    //각각의 input의 value값을 가져올수있음    원래 내수준에는 밑에 input마다 함수를 하나씩 만들어서 하는게 편함.
  }

  render() {
    return (
      <article>
        <h2>Update</h2>
        <form action="/create_process" method="post" onSubmit={function (e) {  //제출시 함수발동
          e.preventDefault();
          this.props.onSubmit(this.state.id, this.state.title, this.state.desc); //App.js에있는 onSubmit함수실행, 인자전달
          //console.log(e.target) //<form action="/create_process" method="post"> ... </form>
          alert(e.target.title.value + '업뎃할 내용이맞습니까?')
        }.bind(this)}
        >
          <input type="hidden" name="id" value={this.state.id}></input> //input hidden은 개발자들이 보이지않게 정보를 더 보내고싶을때사용 이걸로 id값도 보냄 
          <p>
            <input type="text" name="title" placeholder="title" value={this.state.title}  // <<이곳의state를 사용하는모습
              //만약 가져온 props를 바로 사용하면 *value={this.props.data.title} 여기서 props는 read-only 볼수는있지만 수정이안됨.
              //props로 가져온 정보를 이곳에서 바꾸려면 props를 이곳state로 넣어준뒤 state를 사용해야함
              onChange={this.inputFormHandler.bind(this)}
            //onChange 이곳에 무언가 변화가있을대 함수 this.inputFormHandler 함수 실행!
            >
            </input>
          </p>

          <p>
            <textarea name="desc" placeholder="description" value={this.state.desc}
              onChange={this.inputFormHandler.bind(this)}
            >
            </textarea>
          </p>

          <p><input type="submit"></input></p>

        </form>

      </article>
    );
  }
}

export default UpdateContent;
