import React from 'react'

function Delete({ sc, removeSt }) {
    const deleteFunc = () => {
        console.log('yes')
        removeSt()
    }

    let show = (sc) ?
        <h3>정말로 {sc.brand} 을 삭제하시겠습니까??
            <br />
            <button onClick={deleteFunc}>삭제</button>
        </h3>
        :
        <p> 회사를 먼저 선택해주세요</p>

    return (
        <>
            {show}

        </>
    )
}

export default Delete
