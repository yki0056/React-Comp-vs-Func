import React, { Component } from 'react';

class Company extends Component {
    render() {
        var lists = [];
        var data = this.props.cL; //app에있는 companyList배열을 가져옴
        for (var i of data) { //console.log(i.id)  //1 2 3
            lists.push(
                <li key={i.id}>
                    <a herf={'이것은주소' + i.id}
                        data-d={i.id}
                        onClick={function (e) {
                            e.preventDefault();
                            var arg = e.target.getAttribute('data-d');
                            this.props.onChangePage2(arg);
                        }.bind(this)}
                    >
                        {i.brand}
                    </a>
                </li>
            )
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default Company; 