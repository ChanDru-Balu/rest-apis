const express = require('express');
const router = express.Router();
const User = require('./user.model');
const bcryptjs = require('bcryptjs');

router.get('/',(req,res)=>{
    console.log("API calling!")
    res.status(200).json('API working fine!');
})

router.post('/register',async (req,res)=>{
    let {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(404).json({message: 'User Already Available!'})
        }

        let hashedPassword = await bcryptjs.hash(password,10);
        console.log({hashedPassword});
        let newUser = new User({email,password:hashedPassword})
        try{
            await newUser.save(newUser)
            res.status(201).json({message:'user created successfully', data: newUser})
        } catch(error){
            res.status(500).json({message: 'registration failed',error:error.message});
        }
        
    } catch(error){
        res.status(500).json({message: 'find failed',error})
    }
  
})


module.exports = router;