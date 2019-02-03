const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


// Bringing the user model 
let User = require('../models/users');
//bringing the ad model
let Ads = require('../models/ads');
// Register process form
router.post('/register', function (req, res) {

    const email = req.body.email;



    const password = req.body.password;
    const confirm = req.body.confirm;
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Confirm password is required;').notEmpty();
    req.checkBody('password', 'must be at least 6 chars long').isLength({ min: 6 });
    req.checkBody('confirm', 'Password not matched').equals(password);

    let errors = req.validationErrors();
    if (errors) {
        res.status(422).json({

            errors,
            redirect: "/user/register"
        });
        return;
    } else {
        User.find({ email: email }, function (err, preUser) {
            if (err) {
                res.status(500).json({
                    errors: [{
                        param: "Server Error",
                        msg: "Internal Server Error"
                    }]
                })
            } else if (preUser.length > 0) {
                res.status(422).json({
                    errors: [{
                        param: "Email",
                        msg: "Your email already exists."
                    }]
                });
            } else {

                bcrypt.hash(password, 10, function (er, hash) {
                    if (er) {
                        res.status(500).json({
                            er
                        });
                    } else {

                        let NewUser = new User();
                        NewUser.email = email;
                        NewUser.password = hash;
                        NewUser.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.status(422);
                                console.log(err);
                                res.json(err);
                            } else {
                                res.json({
                                    status: "OK"
                                })


                            }

                        });

                    }
                });



            }

            return;
        });
    }


});






// User Login
router.post('/login', function (req, res, next) {

    const email = req.body.email;

    const password = req.body.password;
    req.checkBody('email', 'Email is required').notEmpty();
    //req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.status(422).json({

            errors,
        });
        return;
    }

    User.find({ email })
        
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: "User does not exist."
                })
            }
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        msg: 'password not matched.'
                    })
                } else if (result) {
                    return res.status(200).json(
                        user[0]
                    )
                } else {
                    res.status(401).json({
                        msg: "User does not exist."
                    });
                }

            });
        })
        .catch(er => {
            console.log(er);
            res.status(500).json({
                er
            });
        })



});




router.get('/ads/:userId', function (req, res) {
    Ads.find({ _userId: req.params.userId }, function (err, result) {
        if (err) {
            res.status(422);
            res.json({
                err
            })
        } else {
            res.json(result)
        }
    });

})

module.exports = router;