import React, {Component} from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'


export default class Auth extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = async (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    async register(){
        const {username, password} = this.state
        const res = await axios.post('/auth/register', {username, password})
        this.props.updateUser(res.data.user)
        
    }

    render(){
        return(
            <div className="Auth">
                
            </div>
        )
    }
}