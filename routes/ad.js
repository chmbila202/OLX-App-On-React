const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const formidable = require('formidable');



let Ads = require('../models/ads');

//Submit Ads..  SubmitAdd component
router.post('/ads', function (req, res) {
    var fileManger = new formidable.IncomingForm();
    var imageList = [];
    fileManger.parse(req, function (err, fileds, files) {
        
        for (var oneFile in files) {
            var commingFiles = Array.isArray(files) ? files[oneFile] : [files[oneFile]];
            commingFiles.forEach(function (file) {
                var fileRename = (new Date).getTime() + file.name;
                fs.copy(file.path, './public/uploads/' + fileRename)
                imageList.push(fileRename)
            })
        }
        let ad = new Ads();
        ad._userId = fileds._userId;
        ad.title = fileds.title;
        ad.category = fileds.category;
        ad.price = fileds.price;
        ad.condition = fileds.condition;
        ad.description = fileds.description;
        ad.photo = imageList;
        ad.name = fileds.name;
        ad.phone = fileds.phone;
        ad.province = fileds.province;
        ad.city = fileds.city;
        ad.views = 0;
        ad.date = (new Date()).toDateString();
        ad.save(function (err) {
            if (err) {
                res.status(422);
                console.log(err);
                res.json(err);

            } else {
                res.json({
                    status: "OK"
                })
            }
        })
    })
});

// Get category list items . show in List Component
router.get('/', function (req, res) {
    console.log(req.query.category);
    Ads.find({ category: req.query.category }, function (err, result) {
        if (err) {
            res.status(422);
            res.json({
                err
            })
        } else {
            
        res.json(result)
        }
    });


});

// Get Search Result . specific city against all ads 
router.get('/cities', function (req, res) {
    console.log(req.query.city);
    Ads.find({ city: req.query.city }, function (err, result) {
        if (err) {
            res.status(422);
            res.json({
                err
            })
        } else {

            res.json(result)
        }
    });


});

//Get Signle Object data 
router.get('/item', function (req, res) {
    //console.log(req.query.id);
    let query = { _id: req.query.id };
    Ads.find({ _id: req.query.id }, function (err, result) {
        if (err) {
            res.status(422);
            res.json({
                err
            })
        } else {
            var v = parseInt(result[0].views);
            Ads.updateOne(query, { $inc: { "views": v } });
        
        res.json(result)
        }
    });


});

// Delete Ads 
router.delete('/delete/:id', function (req, res) {
    Ads.remove({ _id: req.params.id })
        .exec()
        .then(result => {
           
            res.status(200).json({
                msg: "You'r Ad Is Deleted!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            })
        });

});

// Update Ads 

//Submit Ads
// router.put('/ads/update/', function (req, res) {
//     //console.log(req.query.id);
//     console.log(req.params.id);
//     var fileManger = new formidable.IncomingForm();
//     var imageList = [];
//     fileManger.parse(req, function (err, fileds, files) {
//         console.log('files', files)
//         console.log('fields', fileds)
//         for (var oneFile in files) {
//             var commingFiles = Array.isArray(files) ? files[oneFile] : [files[oneFile]];
//             commingFiles.forEach(function (file) {


//                 var fileRename = (new Date).getTime() + file.name;
//                 fs.copy(file.path, './public/uploads/' + fileRename)


//                 imageList.push(fileRename)

//             })


//         }


//         let ad = {};
//         ad._userId = fileds._userId;
//         ad.title = fileds.title;
//         ad.category = fileds.category;
//         ad.price = fileds.price;
//         ad.condition = fileds.condition;
//         ad.description = fileds.description;
//         ad.photo = imageList;
//         ad.name = fileds.name;
//         ad.phone = fileds.phone;
//         ad.province = fileds.province;
//         ad.city = fileds.city;
//         ad.date = (new Date()).toDateString();
//         let query = { _id: req.query.id };
//         console.log(query);
//         Ads.updateOne(query, ad, function (err) {
//             if (err) {
//                 res.status(422);
//                 console.log(err);
//                 res.json(err);

//             } else {
//                 res.json({
//                     status: "OK"
//                 })
//             }
//         })

//     })


// });


module.exports = router;