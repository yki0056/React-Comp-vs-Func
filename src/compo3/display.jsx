import React from 'react'

function Display({ main }) { // 부모컴포에서 다른이름의 2개가 들어왓지만 이곳에선 하나로 통일됨.
    //console.log(main)
    let show = (main === '인사') ? <div>'안녕'</div> : <div>{main.brand} {main.price}</div>
    return (
        <>
            <div>{show}</div>
        </>
    )
}

export default Display
