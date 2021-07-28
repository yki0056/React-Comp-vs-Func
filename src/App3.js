import React, { useState } from 'react'
import Subject from './compo3/subject.jsx'
import Company from './compo3/company.jsx'
import Display from './compo3/display.jsx'
import Create from './compo3/create.jsx'
import Delete from './compo3/delete.jsx'
import Update from './compo3/update.jsx'
// class 랑 functional의 가장 큰 차이점  state값을 변경할때
// class의 경우 현재 state을 바로 + 해당부분만 변경이 가능하지만 
// function의 경우 state을 카피한 뒤 수정해서 그걸 setState()에다가 넣어줘야함 

function App3() {
    const [subject] = useState({
        title: 'Web',
        sub: 'website application browser'
    });
    const [mode, setMode] = useState('welcome')
    const [companyList, setCompanyList] = useState([
        { id: 1, brand: '삼성', price: 'High' },
        { id: 2, brand: '제네럴일렉트로닉', price: 'Low' },
        { id: 3, brand: '애플', price: 'Middle' }
    ])
    const [selected_company, set_selected_company] = useState(null)

    // -------------------------------------------------------------
    const modeChangeRead = (idArg) => { // idArg는  id번호 
        setMode('read')
        selectedBrand(Number(idArg))
    }

    // 모든 회사들 state정보중에서 선택한 컴퍼니만 빼내서 다른 state에 저장   -----------------------------------
    const selectedBrand = (selectedId) => {
        companyList.forEach(cl => {
            if (cl.id === selectedId) {  // id 1,2,3 들중 selectedId와 같은것만 
                set_selected_company(cl)
            }
        })
    }

    const addState = (brandName, brandPrice) => {
        // 기존state배열을 1. map으로 카피한뒤 push하거나 , 2. 바로 concat을하거나 , 3. 
        let copiedList = [...companyList]
        let lastItem = companyList.slice(-1)[0]
        // 현재state배열의마지막id에게 +1줘서 추가되는 id의 넘버를 만듬 
        copiedList.push({ id: lastItem.id + 1, brand: brandName, price: brandPrice })
        setCompanyList(copiedList)
    }

    const deleteState = () => {
        if (selected_company) {
            let copyArray = Array.from(companyList)
            let deleteIndex = selected_company.id
            copyArray.splice(deleteIndex - 1, 1);
            setCompanyList(copyArray)
            setMode('welcome') // 삭제뒤 나올 문구 리셋
            set_selected_company(null) // 선택되있던 회사 리셋
        }
    }

    const updateState = (brandVal, priceVal) => {
        let copyArray2 = companyList.map((cl) => {
            if (cl.id === selected_company.id) {
                cl.brand = brandVal;
                cl.price = priceVal;
            }
            return cl
        })
        setCompanyList(copyArray2)
        setMode('read')
    }

    //-------------------------------------------------------------------------
    const show = () => {
        let _result = null;
        if (mode === 'welcome') {
            _result = <Display main={'인사'}></Display>

        } else if (mode === 'read') {
            _result = <Display main={selected_company}></Display>

        } else if (mode === 'create') {
            _result = <Create addSt={addState} ></Create>

        } else if (mode === 'delete') {
            _result = <Delete sc={selected_company} removeSt={deleteState}></Delete>

        } else if (mode === 'update') {
            _result = <Update sc={selected_company} updateSt={updateState}></Update>

        }

        return _result
    }

    return (
        <>
            <div>APP 현재모드: {mode}</div>

            <Subject subj={subject} mcw={() => { setMode('welcome') }}></Subject>

            <Company compL={companyList} mcr={modeChangeRead}></Company>

            <button onClick={() => { setMode('create') }}> create</button>
            <button onClick={() => { setMode('delete') }}> delete</button>
            <button onClick={() => { setMode('update') }}> update</button>

            <hr></hr>

            {show()}

        </>
    )
}

export default App3
