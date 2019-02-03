import React from 'react';
import Header from "./Header";
import axios from 'axios';
import '../static/css/reglogin.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmail } from 'validator';
import NotificationSystem from 'react-notification-system';
import Footer from './footer';

const required = (value, props) => {
    if (!value || (props.isCheckable && !props.checked)) {
        return <span className="form-error is-visible">Required</span>;
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return <span className="form-error is-visible">${value} is not a valid email.</span>;
    }
};

const isEqual = (value, props, components) => {
    const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
    const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

    if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
        return <span className="form-error is-visible">Passwords are not equal.</span>;
    }
};


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm: '',
            error: ''

        };
    }

    _notificationSystem = null

    _addNotification = (level, msg) => {
        
        this._notificationSystem.addNotification({
            message: msg,
            level: level
        });
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;

    }

    getRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/user/register', this.state).then(res => {

            console.log(res.data);

            this._addNotification("success", "You have successfully registered.");
                window.location = '/user/login';
            
        })
            .catch(err => {
                console.log(err)
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
                        <p style={{ fontWeight: 'bold' }}>Create an Account</p>
                        <div id="login">

                            <Form method="POST" onSubmit={this.getRegister}>

                                <div className="form-group">
                                    <Input type="email" className="form-control"
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                                        name="email" id="Email1"
                                        validations={[required, email]}
                                        aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <Input type="password"
                                        value={this.state.password}
                                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                                        className="form-control" name="password" id="password1"
                                        validations={[required, isEqual]}
                                        placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <Input type="password"
                                        value={this.state.password2}
                                        onChange={(e) => { this.setState({ confirm: e.target.value }) }}
                                        className="form-control" name="confirm"
                                        validations={[required, isEqual]}
                                        id="repeatpassword" placeholder="Confirm Password" />
                                </div>


                                <button type="submit" className="btn btn-outline-primary btn-block" >Create</button>


                            </Form>

                        </div>

                    </div>
                </div>
                <NotificationSystem ref="notificationSystem" />
                <Footer />
            </div>

        );
    }
}

export default Register;