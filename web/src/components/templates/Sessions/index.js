import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route} from 'react-router-dom'
import {SignUp, Login} from '../../partials'
import {Row, Col} from 'antd'

const Component = (props)=>(
    <div>
        Here
        <Row>
            <Col xs={8}>
            </Col>
            <Col xs={8}>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
            </Col>
            <Col xs={8}>
                
            </Col>
        </Row>
    </div>
)

export default withRouter(connect((state)=>state)(Component))