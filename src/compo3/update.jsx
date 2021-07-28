import React, { useState } from 'react'

function Update({ sc, updateSt }) {
    const [input_brand_val, set_input_brand_val] = useState(sc.brand); // 초기값으로 선택된 브랜드 띄우기 
    const [input_price_val, set_input_price_val] = useState(sc.price);


    const inputBrandChange = (e) => {
        set_input_brand_val(e.target.value)
    }
    const inputPriceChange = (e) => {
        set_input_price_val(e.target.value)
    }

    const activeFunc = (e) => {
        e.preventDefault()
        updateSt(input_brand_val, input_price_val)
    }

    const show = (sc) ?
        <div>
            <h3>내용을 수정하세요</h3>
            <form action="" onSubmit={activeFunc}>
                <input type="text" value={input_brand_val} onChange={inputBrandChange} />
                <br />
                <textarea value={input_price_val} onChange={inputPriceChange}  ></textarea>
                <br />
                <input type="submit" value="업데이트" />
            </form>
        </div>
        :
        <h3>회사를 먼저 선택해주세요</h3>


    return (
        <div>
            {show}
        </div>
    )

}
export default Update
