import React, { Component } from 'react';

class TOC extends Component {

  //TOC render()는 TOC부분안의 변화가 없어도 다른곳의변화가생기면  render()를 늘함. 그래서 용량이 커지면 성능면에서 좋지않게됨, 불필요하게 render를하니깐.
  // 그래서 App.js <TOC>에서 들어오는 정보인 dat 가 바뀌었을때만 render()를 적용하고, 안바꼈을때는 render()를 안하고 하고싶음.
  shouldComponentUpdate(newProps, newState) {  // props와 state정보를 인자로 받을수있음
    //console.log('toc슈드컴포넌업데이트', newProps, this.props); //만약 새로운 정보를 create해서 content리스트에 추가하면
    //newProps안에는 {dat: Array(4), onChangePage:f} 바뀐값을알수잇고  /  this.props안에는 {dat: Array(3), onChangePage:f} 아직바뀌지않은값을 알수있음
    //*<createContent>에서 배열에 새로운 정보를 추가할때 concat을 사용하고 push를 안쓴이유가 여기있음.
    // push를 사용했을시 newProps 와 this.props의 값이 똑같이 dat: Array(4)가 나왔을거임. 왜냐면 push는 원본[]을 수정하기때문에.
    if (this.props.dat === newProps.dat) { //만약 새로운정보와 이전값이 같다면,
      return false;    //새로 render() 하지마라(화면에 보이지마라)   //브라우저 처음킬때는 false가 있어도 무조건 render()한번작동함
    }
    return true;  //위의 조건문에 걸리지 않는다면  render()해라
  }


  //1. HTML, CSS, Jacascript의 리스트를 만들어 html에 나오게하고,
  //2. 클릭시 해당 data attribute정보를 가져와 3리스트중 어떤걸 클릭한지 구별하고, 실행함수의 인자로 넣어져. App.js의 <TOC>에서 함수가해당인자값으로 state 정보를 바꿈.
  render() {
    //정보를 받아오는 순서  App.js파일의 this.state 안의 정보를이동 --> App.js 밑 <TOC></TOC>로, 그후  --> 이곳에서 this로 정보얻음.
    var lists = [];
    //console.log(this) // TOC { props: {…} }
    //console.log(this.props) // props { data: Array(3), onChangePage f() }
    //console.log(this.props.dat) //(3)[{…},{…},{…}]  // 0:{id: 1, title: "HTML", desc: "HTML is for Information"}, 1:{id:2..}, 2:{...}
    var data = this.props.dat;            // this.props.dat[i] =  1,2,3   //  data[i].id  =  1,2,3
    for (var i = 0; i < data.length; i++) {
      lists.push(    //key={data[i].id}는 나오는 각각의 결과들을 react자체가 필요해서 식별할수있겠끔 넣어주는거임 안적어도 나오는 결과에 영향은없지만 콘솔에 error가있음.
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            data-d={data[i].id}
            onClick={function (e) {   //링크클릭시 클릭이벤트 함수 만들기
              e.preventDefault();    //위에 데이타값을 만드는이유는  클릭시 data[i].id값인 (1,2,3) 셋중 클릭된것을 가져와야되는데       
              //console.log(data[i].id)  // error 뜸  
              //data[i].id 를 인자(arg)로 직접 사용못하는 이유는  onClick함수는 내부함수라서 data[i].id 를 인식하지못하기때문에
              //그래서 요소에 데이터를 만들고, 클릭한요소의데이타를받고, 함수의인자로넣어야함
              // console.log(e.target)         //클릭한 a태그의 요소 ex) javascript클릭시 <a href="/content/3" data-id="3">Javascript</a>
              var arg = e.target.dataset.d;    //dataset명령어는 attribute에있는 data의속성값을 불러옴 // 1, 2, 3 셋중에 하나
              //var arg = e.target.getAttribute('data-d');  //위랑같은코딩
              //현재 클릭한 링크의 데이타를 불러옴, 그걸  onChangePage()의 인자로 넣어 함수를 실행해라!
              this.props.onChangePage(arg);
            }.bind(this)}
          >
            {data[i].title}
          </a>
        </li >
      );
    } // 결과로 HTML,CSS,Javascript 리스트가 생겼고 ex) <li><a href="/content/1" data-d="1">HTML</a></li> , 해당요소 클릭시 onChangePage(arg) 발동  
    //console.log(lists) //(3) [{…}, {…}, {…}]
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}
export default TOC;
