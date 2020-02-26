import React from 'react'
import {connect} from 'react-redux'

const Data = (props)=>{
    return <div>
        Here There
        {props.accounts.map((account, key)=>
            <div key={key}>
                {account.firstName}&nbsp;
                {account.lastName}
            </div>
        )}
    </div>
}

export default connect((data)=>data)(Data);