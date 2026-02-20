const express = require('express');
const router = express.Router();

const Login = require('../models/user');


router.post("/",async(req,res) => {
    const {email,password} = req.body;
    if(!email||!password) {
        return res.status(400).json({status:false,message:"All fields are must filled"});
    }
    try {
        const user = await Login.findOne({email});

        if (!user) {
            return res.status(404).json({status:false,message:"No such account exist with this email"});
        }

        if(user.password !== password) {
            return res.status(400).json({status:false,message:"Wrong password"});
        }

        return res.status(200).json({status:true,message:"Successfully logged in"});

    } catch (error) {
        return res.status(500).json({status:false,message:"Server error"});
    }
});


module.exports = router;