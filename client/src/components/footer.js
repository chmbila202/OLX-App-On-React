import React from 'react';
import logo from '../assests/olx-logo.png';
import '../static/css/app.css';
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="footer" className="container-fluid">

                <div id="footer-detail">
                    <img src={logo} alt="Logo" id="flogo" height="60" width="60" />
                    <small>&copy; Copyright 2018, Muhammad Bilal Sadiq</small>
                    <div style={{ float: "right" }}>
                        <a href="">Location Map</a> <br></br>
                        <a href="">Popular</a> <br></br>
                        <a href="">Term and use</a> <br></br>
                        <a href="">Help & Contact Us</a>
                        
                    </div>

                </div>


            </div>


        );
    }
}

export default Footer;