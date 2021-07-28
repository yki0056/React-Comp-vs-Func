import React, { Component } from 'react';
import Subject from './compo2/subject.js';
import Company from './compo2/company.js';
import Ddisplay from './compo2/display.js';
import Control from './compo2/control.js';
import Create from './compo2/create.js';
import Update from './compo2/update.js';
import ClockUsingClass from './compo2/clock.js';
//import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: null,
      subject: { title: 'Web', sub: 'web application is the best' },
      welcome: { title: '어서오세요', desc: '리액트를 배우러오셨군요' },
      companyList: [
        { id: 1, brand: '삼성', price: 'high' },
        { id: 2, brand: '제네럴일렉트로닉', price: 'low' },
        { id: 3, brand: '애플', price: 'middle' }
      ]
    }
  }

  render() {
    return (
      <div className="App">

        <ClockUsingClass></ClockUsingClass>

        <Subject
          title1={this.state.subject.title}
          sub1={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' })
          }.bind(this)}
        >
        </Subject>
        <Company
          cL={this.state.companyList}
          onChangePage2={function (arg) {
            this.setState({ mode: 'read', selected_content_id: Number(arg) })
          }.bind(this)}
        >
        </Company>
        <Control
          onChangeMode={function (md) {
            if (md == 'delete') { // 삭제는 디스플레이에 보여줄게 없으므로 모드 필요없음 
              var copyArray = Array.from(this.state.companyList)
              for (var i = 0; i < copyArray.length; i++) {
                console.log(copyArray[i].id)
                if (copyArray[i].id == this.state.selected_content_id && this.state.mode == 'read') {
                  copyArray.splice(i, 1)
                  break;
                }
              }
              this.setState({ companyList: copyArray, mode: 'welcome' })
            } else {
              this.setState({ mode: md }) //md가 delete가 아닐시,  create,update  해당 md이름으로 state.mode를 바꿈.
            }
          }.bind(this)}
        >
        </Control>

        {this.displayContent()}

      </div >
    );
  }
  /*이함수는 결과로 컴포넌트 <Ddisplay>, <create>, <update> 중 하나로 바뀜 */
  displayContent() {  // state모드에 따라 다른 _result배출 
    var _title = null;
    var _description = null;
    var _result = null;

    if (this.state.mode == 'welcome') {
      _title = this.state.welcome.title;
      _description = this.state.welcome.desc;
      _result = <Ddisplay main={_title} sub={_description}></Ddisplay>

    } else if (this.state.mode == 'read') {
      for (var i = 0; i < this.state.companyList.length; i++) {
        var eachCompany = this.state.companyList[i]  // {id:1, brand:samsung}{id:2, ...}{id:3, ...}
        // 현재 state배열안의 id들중 선택된 selected_content_id와 값이 같은게 있다면  
        if (eachCompany.id === this.state.selected_content_id) { // 해당브랜드를 보이게함 
          _result = <Ddisplay main={eachCompany.brand} sub={eachCompany.price}></Ddisplay>
        }
      }

    } else if (this.state.mode == 'create') {
      _result =
        <Create submitInfo={function (b, d) {
          this.max_content_id = this.max_content_id + 1;
          var addedArray = this.state.companyList.concat({ id: this.max_content_id, brand: b, price: d })
          this.setState({ companyList: addedArray, selected_content_id: this.max_content_id, mode: 'read' })
        }.bind(this)}>
        </Create>
    }

    else if (this.state.mode == 'update') {
      for (var i = 0; i < this.state.companyList.length; i++) {
        var eachCompany = this.state.companyList[i]
        if (eachCompany.id == this.state.selected_content_id) {
          _result =
            <Update data={eachCompany} updateInfo={function (a, b, c) { //인자들은 update.js에서 날라온 upid, uptitle, updesc 정보
              var _contents = Array.from(this.state.companyList);//원본배열 복사 (나중에 성능향상 테크닉때문에 하는게좋음)
              for (var i = 0; i < _contents.length; i++) {
                // console.log(_contents[i])  //이건 defulat값 {id: 1, brand: "삼성", price: "high"} {id: 2,...} {id: 3, ...}
                if (_contents[i].id === a) {  // state배열안 id정보와  인자 a(id정보) 가 같다면
                  _contents[i] = { id: a, brand: b, price: c }
                }
              }
              this.setState({ companyList: _contents, mode: 'read' });
              //복사배열을 원본으로 넣은다음, mode를 update에서 read로 바꿈
            }.bind(this)}>
            </Update>
        }
      }
    }
    return _result

  }


}
export default App;
