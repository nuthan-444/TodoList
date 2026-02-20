const express = require('express');
const router = express.Router();

const Signup = require('../models/user');

router.get("/",async(req,res) => {
    res.send("from /signup");
});


//creating user account
router.post("/" , async(req,res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({status:false,message:"All fields are must filled."});
    }
    try {

        const isEmailAlreadyExist = await Signup.findOne({email});

        if(isEmailAlreadyExist) {
            return res.status(400).json({status:false,message:"Already Account exist with this email."});
        }

        const CreatingUser = await Signup.create({name,email,password});

        return res.status(201).json({status:true,message:"Account Created Successfully."});

    } catch (error) {
        return res.status(500).json({status:false,message:"Server error",error});
    }
});



// updating user account
router.put("/:email" , async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const UpdatingUser = await Signup.findOneAndUpdate({email:req.params.email},{$set :{name,email,password}},{new:true});
        res.json(UpdatingUser);
    } catch (error) {
         res.json({message:error});
    }
});


// deleting
router.delete("/:email" , async(req,res) => {
    try {
        const DeletingUser = await Signup.findOneAndDelete({email:req.params.email});
        res.json(DeletingUser);
    } catch (error) {
         res.json({message:error});
    }
});


module.exports = router;