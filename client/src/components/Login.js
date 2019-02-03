import React from 'react';
import Header from './Header';
import '../static/css/reglogin.css';
import { NavLink } from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''

        }
    }

    _notificationSystem = null

    _addNotification = (level, msg) => {
        //event.preventDefault();
        this._notificationSystem.addNotification({
            message: msg,
            level: level
        });
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;

    }

    getLogIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/user/login', this.state).then(res => {
            console.log(res.data);

            this._addNotification("success", "You have successfully LogIn.");
            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem("UserObject", JSON.stringify(res.data));
                window.location = '/myaccount';

            }
        })
            .catch(err => {
                console.log(err)
                console.log(err.response.data.msg);
                if(err.response.status === 401) {
                    this._addNotification("error", `${err.response.data.msg}`);
                }
                console.error(err.response);
                var errors = err.response.data.errors === undefined ? [] : err.response.data.errors;

                for (var i = 0; i < errors.length; i++) {
                    this._addNotification("error", `${i + 1} -> ${errors[i].param}: ${errors[i].msg}`)
                }


            });

    }

    render() {
        return (
            <div>
                <div className="container">
                    <Header />
                    <div id="loginarea">
                        <p style={{ fontWeight: 'bold' }}>LogIn</p>
                        <div id="login">

                            <form method="POST" onSubmit={this.getLogIn}>
                                <div className="form-group" id="iconlogin">
                                    <input type="email" 
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                                        className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <i className="fas fa-envelope"></i>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group" id="iconlogin2">
                                    <input type="password" 
                                        value={this.state.password}
                                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                                        className="form-control" name="password" id="password" placeholder="Password" />
                                        <i className="fas fa-unlock-alt"></i>
                                </div>


                                <button type="submit" className="btn btn-outline-primary btn-block">Submit</button>
                                <p className="acfl">Forgot Password?</p>
                                <NavLink to='/user/register'><p className="acfr">New User? Register Here</p></NavLink>
                            </form>

                        </div>

                    </div>
                </div>
                <Footer />
                <NotificationSystem ref="notificationSystem" />

            </div>

        );
    }
}

export default Login;