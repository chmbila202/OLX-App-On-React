import React from 'react';
import '../../static/css/account.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const _userId = JSON.parse(localStorage.getItem('UserObject'));

class MyAds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.deleteAd = this.deleteAd.bind(this);
    }

    componentDidMount() {
        let path = !_userId ? '' : _userId._id;
        console.log(this.props);
        axios.get('http://localhost:5000/user/ads/' + path)
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            }).catch(err => console.error(err))

    }
    // Delete user his own posted ad .. request.
    deleteAd(id) {
        axios.delete('http://localhost:5000/item/delete/' + id)
            .then(res => {
                //console.log(res.data);
                window.location = '/myaccount'
            }).catch(err => {
                console.error(err);
            })
    }


    render() {
        return (
            <div id="myadd">
                <div id="bar">
                    <p>Here Is The List Of You'r Ads</p>
                </div>

                {
                    this.state.data.length === 0 ? <NoAds /> : <ListItem data={this.state.data}
                        deleteAd={this.deleteAd}
                    />
                }





            </div>

        );
    }
}

const ListItem = (props) => {


    return (
        <div className="row">
            {
                props.data.map(item => {
                    return (
                        <div id="mylist" key={item._id}>
                            <div id="myitem-img">

                                <img src={'http://localhost:5000/uploads/' + item.photo[0]} alt="List-Item" height='120' id="img" />

                            </div>
                            <div id="myitem-detail">
                                <p id="myproduct-name">{item.title}</p>
                                <p id="myproduct-cate">{item.category}</p>
                                <p id="myproduct-price"><span>Rs.</span>{item.price}</p>


                            </div>
                            <div id="mybtn">
                                <NavLink to={`/item/${item._id}`}><button type="button" className="btn btn-outline-primary">View</button></NavLink>
                               
                                <button type="button" className="btn btn-outline-danger"
                                    data-toggle="modal" data-target="#Modal"
                                >Delete</button>

                            </div>

                            <div className="modal fade" id="Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Delete Ad</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure that you want to delete ad.?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-light" data-dismiss="modal">No</button>
                                            <button type="button" className="btn btn-danger" onClick={() => props.deleteAd(item._id)}>Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })
            }


        </div>


    );
}

const NoAds = () => {
    return (
        <div style={{ marginTop: '20px' }}>
            <p style={{ textAlign: 'center' }}><i className="far fa-frown" style={{ fontSize: '40px' }}></i></p>
            <p style={{ textAlign: 'center', fontSize: '20px' }}> There is no ads yet</p>
        </div>
    );

}

export default MyAds;