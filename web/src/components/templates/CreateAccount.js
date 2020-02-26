import React, {Component} from 'react'
import {Accounts} from '../../collections'

class CreateAccount extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
        this.handleFirstName = this.handleValues.bind(this, 'firstName')
        this.handleLastName = this.handleValues.bind(this, 'lastName')
        this.handleEmail = this.handleValues.bind(this, 'email')
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleValues(key, e){
        this.setState({
            [`${key}`]: e.target.value 
        })
    }
    handleSubmit(e){
        e.preventDefault()
        Accounts.create(this.state).then(()=>{
            this.setState({
                firstName: '',
                lastName: '',
                email: ''
            })
        })
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                First Name:
                <br />
                <input type='text' onChange={this.handleFirstName} value={this.state.firstName} />
                <br />
                <br />
                Last Name:
                <br />
                <input type='text' onChange={this.handleLastName} value={this.state.lastName} />
                <br />
                <br />
                Email:
                <br />
                <input type='text' onChange={this.handleEmail} value={this.state.email} />
                <input type='submit' />
            </form>
        )
    }
}

export default CreateAccount