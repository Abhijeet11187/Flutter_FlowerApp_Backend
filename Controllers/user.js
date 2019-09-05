const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../Schema/user');
const random = require('random');


var OTP;

// Forget Password

exports.forget = (req, res, next) => {
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'lokhandeabhijeet11187@gmail.com',
            pass:'Abhi@11187'
        }
    });
  
    User.findOne({ email: req.body.email }).exec().then((result) => {
        
        console.log(result.email);
       OTP=random.int(min=1111, max=9999);
        console.log(OTP)
        var mailOptions={
            from:'lokhandeabhijeet11187@gmail.com',
            to:result.email,
            subject:'Your One Time Password is',
            text:'OTP '+OTP
            
        };
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error); 
            }
            else{
                console.log('email send');
            }
        })
        res.status(200).json({ OTP: OTP });
    }).catch((error)=>{
        res.status(400).json({error:error})
    })


}


// Signup



exports.signUp = (req, res, next) => {
    console.log('req.body.profiePic');



    User.find({ email: req.body.email }).exec().then(result => {
        console.log("I n the post")
        if (result.length >= 1) {
            res.status(401).json({ message: 'already exist' })
        }
        else {

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                mobileNo: req.body.mobileNo,
                password: req.body.password,
                username: req.body.username,
                state: req.body.state,
                city: req.body.city,
                pinCode: req.body.pinCode,
                address: req.body.address
                // profiePic: (req.file ? req.file.path : "uploads/default.jpg")

            });
            user.save().then(result => {
                res.status(201).json({
                    Message: 'user created successfully',
                    user: result.email,
                    id: result._id

                });
            }).catch(err => {
                res.status(500).json({ error: err });
            });

        }

    })



}


//Login

exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email }).exec()
        .then((result) => {
            if (result.password === req.body.password) {
                res.status(201).json(result)
            }

        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

}