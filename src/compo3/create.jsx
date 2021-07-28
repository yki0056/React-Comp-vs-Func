import React from 'react'

function Create({ addSt }) {

    return (
        <>
            <h3>Create Section</h3>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                let getBrandName = e.target.bd.value;
                let getBrandPrice = e.target.pc.value;
                addSt(getBrandName, getBrandPrice)
                e.target.bd.value = '';
                e.target.pc.value = '';
            }}>
                <div><input type="text" name="bd" placeholder="생성할 브랜드 입력" /></div>
                <div><textarea name="pc" placeholder="가격 입력"></textarea></div>
                <input type="submit" value="생성합니다" />
            </form>
        </>
    )
}

export default Create
