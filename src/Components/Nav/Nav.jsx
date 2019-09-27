import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {reloadUser} from '../../ducks/reducer'

class Nav extends Component{

    logout = () => {
        axios.delete('/auth/logout')
    }

    componentDidMount(){
        axios.get('/auth/user').then(res => {
            this.props.reloadUser(res.data)
        })
    }

    render(){
        return(
            <div className="Nav">
                <div className="nav-container">
                    <div className="nav-container2">
                        <div className="profile">
                            <img className='profile-pic' src={this.props.user.profilepic} alt=""/>
                            <h1>{this.props.user.username}</h1>
                        </div>
                        <div className="create">
                            <Link to='/new' ><img src="data:image/png;base64,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" alt=""/></Link>
                            <Link to='/dashboard' ><img src="data:image/png;base64,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" alt=""/></Link>
                        </div>
                    </div>
                    <div className="bottom-navbar">
                        <Link to='/' onClick={this.logout} ><img src="" alt=""/></Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {reloadUser})(Nav)