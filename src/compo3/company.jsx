import React from 'react'
import './company_style.css'

function Company({ compL, mcr }) {
    let list = [];

    compL.forEach(cl => {
        list.push(
            <li key={cl.id} data-d={cl.id}
                onClick={function (e) {
                    e.preventDefault();
                    mcr(e.target.dataset.d)
                    // 클린한 <li>태그에게  클래스 만들고 없애고  
                    const siblings = e.target.parentNode.childNodes
                    siblings.forEach(s => { s.classList.remove('boldText') })
                    e.target.classList.add('boldText')
                }}>
                {cl.brand}
            </li>
        )
    })
    //console.log(list)
    return (
        <>
            <ul>
                {list}
            </ul>
        </>
    )
}

export default Company
