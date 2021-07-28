import React, { Component } from 'react';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = { // 이곳 컴포넌트의 state 정보들
            upid: this.props.data.id,
            uptitle: this.props.data.brand,
            updesc: this.props.data.price
        }
    }
    inputFormHandler(e) {
        // 현재 적고있는 input값들을 바로 이곳 State에 저장함 
        //console.log(e.target.name)  //지금 적고있는고의 name값  ex) upid, updesc
        this.setState({ [e.target.name]: e.target.value });
        // { uptitle: 내가적는글 }  // 변수를 객체의key값으로 넣으려면 []안에다가 넣어야함 
        // { updesc: 내가적는글 }
    } // 그뒤 onSubmit 버튼 클릭시 이곳 state정보들을  부모컴포넌트 함수에 인자로 넣어서 발동시킴
    render() {
        return (
            <div>
                <h2>Update 기존리스트</h2>
                <form action='#' method='post' onSubmit={function (e) {
                    e.preventDefault();
                    this.props.updateInfo(this.state.upid, this.state.uptitle, this.state.updesc);
                }.bind(this)}
                >
                    <input type="hidden" name="upid" value={this.state.upid}></input>
                    <p>
                        <input type="text" name="uptitle" placeholder="이름수정할걸적어라" value={this.state.uptitle}
                            onChange={this.inputFormHandler.bind(this)}
                        >
                        </input>
                    </p>

                    <p>
                        <textarea name="updesc" placeholder="가격수정할거적어라" value={this.state.updesc}
                            onChange={this.inputFormHandler.bind(this)}
                        >
                        </textarea>
                    </p>

                    <p><input type="submit"></input></p>
                </form>
            </div >
        )
    }

}

export default Update;