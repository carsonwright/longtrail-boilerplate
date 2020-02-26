import React from 'react'
import {connect} from 'react-redux'
import CreateAccount from './CreateAccount'

const Component = (props)=>(
    <div>
        Here There
        {props.accounts.map((account, key)=>
            <div key={key}>
                {account.firstName}&nbsp;
                {account.lastName}
            </div>
        )}
        <CreateAccount />
    </div>
)
export default connect((state)=> state)(Component)