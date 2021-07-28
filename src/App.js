import React, { Component } from 'react';
import Subject from './compo/subject.js'
import TOC from "./compo/toc.js";
import ReadContent from './compo/readcontent.js'
import Control from './compo/control.js'
import CreateContent from './compo/createcontent.js'
import UpdateContent from './compo/updatecontent.js'

//하위컴포넌트 클래스 subject,toc,content에서 상위컴포넌트 클래스 App의 정보를 얻고자할때  하위컴포넌트쪽에서 props를사용하여 상위쪽정보 가져올수있음
//반대로 하위에서 상위로 정보를 전달할때는 props를 사용못함, 이벤트를 사용해서 트리거를 만들어서 보냄
//하위 컴포넌트에선 인자값으로 줄것을 정해서 함수(인자값)실행   --> 상위컴포넌트 함수를사용해서 받아온 인자값으로 setState을 수정함
class App extends Component {
  constructor(props) { //컨스트럭터하는 함수가 맨처음 발동해서 초기화를한다
    super(props);     //props나state의 정보가 바뀌면 render()함수가 다시 발동하며 다시 그려진다
    this.max_content_id = 3;  //이줄은 state안에 있는 정보가 아니므로 브라우저에 영향이 1도없음
    this.state = {
      mode: 'welcome',
      selected_content_id: 1,
      subject: { title: "WEB", sub: "World wide Web!" },
      welcome: { title: 'welcomee', desc: 'Hello, React' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for Information' },
        { id: 2, title: 'CSS', desc: 'CSS is for Deisign' },
        { id: 3, title: 'Javascript', desc: 'JS is for Interactive' }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Subject
          title1={this.state.subject.title}
          sub1={this.state.subject.sub}
          onChangePage={function () {        //함수내에서의 this는 대상이없기때문에 .bind(this)를 사용해서 this.state.mode를 찾을수있게함
            this.setState({ mode: 'welcome' });  //bind를해서 이곳에서의 this는 App
          }.bind(this)}                      //함수가 할일은 이곳에서 정해줌, mode:값을 'welcome'으로 바꿈.
        >
        </Subject>
        <TOC
          onChangePage={function (arg) { //이곳의 함수가 하는일은 state내의 정보를 바꿈.  //arg인자 toc.js 파일에있는
            this.setState({ mode: 'read', selected_content_id: Number(arg) });  //arg는 1,2,3 중에 하나임
          }.bind(this)}
          dat={this.state.contents}   //state정보를 toc.js파일로 전달
        >
        </TOC>
        <Control
          onChangeMode={function (md) {  //md인자로 'create','update','delete'가 들어오고 함수를 사용해서 해당인자이름으로 state모드를 바꿈.
            if (md === 'delete') {
              if (window.confirm('정말???')) {    //확인 or 취소   확인클릭시 true 
                var cc = Array.from(this.state.contents);  //배열 복사   /오리지날배열을 사용하면 새로고침시 복구안됨.
                for (var i = 0; i < cc.length; i++) {
                  if (cc[i].id === this.state.selected_content_id) {
                    //cc.[0,1,2].id  3개중  === 현재의 this.state.selected_content_id가 예를들어 2라고 할시 (css) 
                    //cc.[1].id   =  id:2
                    cc.splice(i, 1);  //cc.splice(1, 1)  배열안2번째줄1개를없애라
                    break;
                  }
                }
                this.setState({ contents: cc, mode: 'welcome' }) //cc배열을 오리지날 배열에 넣고
                alert('삭제완료') //동시에 모드를'welcome'으로바꿈 모드를 안바꾸면 삭제된정보를 'read'할수없기에 error 발생
              }
            } else {   //취소 눌렀을시 
              this.setState({     //그대로 delete에 머무르기
                mode: md
              })
            }
          }.bind(this)}
        >
        </Control>

        {this.getContent()}

      </div>
    );
  }
  //state모드가 read 혹은 update 가 되면 발동 (클릭이벤트가 아님) 현재배열안의 정보를 selected_content_id의 숫자에 따라 값을가져옴. 
  getReadContent() { //selected_content_id값은 (toc의 클릭이벤트함수 + onChangePage(arg)함수에서 setState를 통해 값이 바뀔수있음.)
    for (var i = 0; i < this.state.contents.length; i++) {
      var data = this.state.contents[i];  // css클릭시, 배열안의 첫번째와 두번쨰가 나옴  {id: 1, title: "HTML"} {id: 2, title: "CSS"}
      if (data.id === this.state.selected_content_id) {     // 1, 2  ===  2   두가지 정보중 하나만 맞아도 통과
        return data;  //css 클릭시 필요없는 html정보도 나왔지만, return을 하면 마지막 정보만 배출되기때문에   return data 값은 2임
        break;   //console.log(data) //css클릭시 {id: 2, title: "CSS", desc: "CSS is for Deisign"}
      }
    }
  }
  //가장 밑에 display되는 파트 현 모드에 따라 보여주는게 다름. <ReadContent><CreateContent><UpdateContent> 이세가지가 바뀌면서 서로 다른걸 display함
  getContent() {  //원래 이함수안에 말고 render()함수안에 같이있었는데 너무 복잡해서보여서 따로 분리해놧음
    var _title = null;      //null이란 현재는 값이 없지만 값이 변동 될수있음
    var _desc = null;       //밑의 if 문들중 true가 되는것이  _article변수가 됨  그리고 맨밑에서 return을 해줌으로 
    var _article = null;    //getContent()의 최종 결과로 _article 이 나감  

    if (this.state.mode === 'welcome') {  //모드가 welcome 이라면
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}> </ReadContent>

    } else if (this.state.mode === 'read') {  //모드가 read가 됬다면
      var _content = this.getReadContent()  //css리스트 클릭시/ console.log(_content) {id: 2, title: "CSS", desc: "CSS is for Deisign"}
      _article = <ReadContent title={_content.title} desc={_content.desc}> </ReadContent>

    } else if (this.state.mode === 'create') { //모드가 create이 됬다면
      _article = <CreateContent onSubmit={function (tit, des) {  //내가 적은 새로 create할것의 제목 과 설명
        //목표  서브밋 누를시 폼안의 내용을 this.state.contents 에다가 새로운 정보를 넣고싶음
        this.max_content_id = this.max_content_id + 1;
        var cont = this.state.contents.concat({ id: this.max_content_id, title: tit, desc: des });
        //state.contents를 concat으로 복사하고 그곳에다가 새로운정보를 추가 // 원본 state.contents 를 그대로 유지할수있음!
        // 새로넣은 정보 {id:4, title: '리액트', desc: '리액트는 어렵다'}  // .concat()말고 .push()도 가능하지만 push는 오리지날을 해침
        //console.log(cont) [ state.contents안에있는 3개의정보 {html},{css},{js} + 새로들어온 정보{} ]  그리고나서 카피배열을 setState에 넣어주면됨.  
        //create 버튼 누르면 바로 새로만든걸 볼수있게하기
        this.setState({ contents: cont, mode: 'read', selected_content_id: this.max_content_id });
        //오리지날state.content를 cont로 바꾼다음  , 모드를create에서 read로 바꿈 , 새로생성된걸 바로 볼수있도록 id도 바뀐내용의 id로 설정함.
      }.bind(this)}>
      </CreateContent>

    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        //css클릭시 _content = {id: 2, title: "CSS", desc: "CSS is for Deisign"}
        //data라는 이름으로 _content정보를 저쪽으로 보냄
        //이밑으로는 제출함수가 일어난뒤에 this.state.contents는 
        var _contents = Array.from(this.state.contents);//원본배열 복사 (나중에 성능향상 테크닉때문에 하는게좋음)
        console.log(_contents)
        //console.log(_id, _title, _desc)  // 2 "CSS잉" "CSS is for 디자인"
        for (var i = 0; i < _contents.length; i++) {
          if (_contents[i].id === _id) {
            _contents[i] = { id: _id, title: _title, desc: _desc }
          }
        }
        this.setState({ contents: _contents, mode: 'read' });
        //복사배열을 원본으로 넣은다음, mode를update에서 read로 바꿈
      }.bind(this)}>
      </UpdateContent>
    }

    return _article;
  }

}
export default App;
