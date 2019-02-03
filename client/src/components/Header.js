import React from 'react';
import logo from '../assests/olx-logo.png';
import '../static/css/header.css';
import { NavLink } from 'react-router-dom';

const currentUser = JSON.parse(localStorage.getItem('UserObject'));

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: currentUser == undefined ? 'My Account' : currentUser.email

        };
        //console.log(this.props);
    }
    render() {
        return (
            <div id="header" className="container">
                <div className="flex-container">
                    <div className="flexlogo">
                        <div>
                            <NavLink to='/'><img src={logo} alt="Logo" id="logo" /></NavLink>
                        </div>
                        <div id="slogon">
                            <h4>Pakistan's Largest Market Place</h4>
                        </div>
                    </div>
                    <div className="flexbtn" id="btn-group">

                        {
                            (!currentUser ? <NavLink to='/user/login' >
                                <button type="button" className="btn btn-default resbtn" id="account-btn">
                                    <i className="fa fa-user"></i>
                                    &nbsp;&nbsp;
                         My Account</button>
                            </NavLink> :

                                <div className="dropdown resbtn2">
                                    <button className="btn btn-secondary dropdown-toggle btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.userid.split(/@[a-z]*.com/)}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                                        <NavLink to='/myaccount'><span className="dropdown-item">
                                            My Account</span></NavLink>
                                        <span className="dropdown-item" onClick={
                                            () => {
                                                localStorage.removeItem('UserObject');
                                                window.location = '/'
                                            }
                                        }>LogOut</span>
                                    </div>
                                </div>
                            )
                        }



                        <div>

                            <NavLink to={!currentUser ? '/user/login' : '/posting'}><button type="button" id="ad-btn" className="btn btn-outline-warning btn-lg resbtn3" >Submit an Ad</button></NavLink>

                        </div>
                    </div>




                </div>
            </div>

        );
    }
}

export default Header;