import React from 'react'

function Subject({ subj, mcw }) {

    return (
        <>
            <h3 onClick={() => { mcw() }}>{subj.title}</h3>
            <p>{subj.sub}</p>
        </>
    )
}

export default Subject
