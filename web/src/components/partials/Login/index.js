import React, {Component} from 'react'
import {
    Input,
    Col,
    Row,
    Button,
    Form
} from 'antd'
import {Session} from '../../../collections'

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.handleLogin = this.handleLogin.bind(this)
    }
    hasNumber(password){
        return password && password.match(/[0-9]/g)
    }
    hasUpperCase(password){
        return password && password.match(/[A-Z]/g)

    }
    hasLowerCase(password){
        return password && password.match(/[a-z]/g)
    }
    testPasswordMatch(password, passwordConfirmation){
        let passwordsMatch
        if(password && password === passwordConfirmation){
            passwordsMatch = true;
        }else{
            passwordsMatch = false;
        }
        this.setState({
            passwordsMatch
        })
    }
    testPassword(password){
        let passwordHasNumber;
        let passwordHasUpperCase;
        let passwordHasLowerCase;
        if(this.hasNumber(password)){
            passwordHasNumber = true
        }else{
            passwordHasNumber = false
        }
        if(this.hasUpperCase(password)){
            passwordHasUpperCase = true
        }else{
            passwordHasUpperCase = false
        }
        if(this.hasLowerCase(password)){
            passwordHasLowerCase = true
        }else{
            passwordHasLowerCase = false
        }
        
        this.setState({
            passwordHasLowerCase,
            passwordHasUpperCase,
            passwordHasNumber
        })
        const passwordTest = (
            passwordHasLowerCase &&
            passwordHasUpperCase &&
            passwordHasNumber
        )
        if(passwordTest){
            return true
        }else{
            return false
        }
    }
    handleLogin(e){
        e.preventDefault()

        this.props.form.validateFieldsAndScroll((err, values)=>{
            if(!err){
                Session.login(values);
            }
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        console.log(this.state)
        return (
            <div>
                <Form onSubmit={this.handleLogin}>
                    <Row>
                        <Col xs={24} style={{padding: 12}}>
                            {getFieldDecorator(`email`, {
                                rules: [{ required: true, message: 'Input invalid.' }],
                            })(
                                <Input placeholder='johndoe@example.com' />
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} style={{padding: 12}}>
                            {getFieldDecorator(`password`, {
                                rules: [{ required: true, message: 'Input invalid.' }],
                            })(
                                <Input
                                    type='password'
                                    placeholder='yourpassword' 
                                    onKeyUp={this.handleTestPassword}
                                />
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <Button htmlType='submit'>
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(SignUp)