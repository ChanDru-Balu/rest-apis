require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('./user.model');
const bcryptjs = require('bcryptjs');
const generateToken = require('./../utils/token');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verify');

const redis = require('redis');
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});
redisClient.on('error',err => console.error('Redis Error on:',err));

redisClient.connect()

router.get('/', (req, res) => {
    res.status(200).json('API working fine!');
})

router.post('/register', async (req, res) => {
    let { email, mobile, userName , password } = req.body;
    try {
        // let user = await User.findOne({ email });
        if (await User.findOne({ email })) {
            return res.status(404).json({ message: 'Email Already Available!' })
        }
        if (await User.findOne({ mobile })) {
            return res.status(404).json({ message: 'Mobile Already Available!' })
        }
        if (await User.findOne({ userName })) {
            return res.status(404).json({ message: 'Username Already Available!' })
        }

        let hashedPassword = await bcryptjs.hash(password, 10);
        let newUser = new User({ email,mobile,userName, password: hashedPassword })
        try {
            await newUser.save(newUser)
            res.status(201).json({ message: 'user created successfully', data: newUser })
        } catch (error) {
            res.status(500).json({ message: 'registration failed', error: error.message });
        }

    } catch (error) {
        res.status(500).json({ message: 'register server error', error })
    }

})


router.post('/login', async (req, res) => {
    console.log(req.body)
    let { password , ...contactInput } = req.body;

    try {
        console.log({contactInput})
        let user = await User.findOne(contactInput);
        if (!user) {
            return res.status(404).json({ message: 'user not found!' })
        } else {
            let isLoggedIn = await bcryptjs.compare(password, user.password);

            if (isLoggedIn) {
                try {
                    let token = generateToken(user)

                    res.status(200).json({ message: 'login successfull!', data: {token , user: {contactInput : user.contactInput  , id: user._id}}})
                } catch (error) {
                    res.status(500).json({ message: 'JWT error', error })
                }
            } else {
                return res.status(401).json({ message: 'login failed!' });
            }

        }


    } catch (error) {
        res.status(500).json({ message: 'login server error', error })
    }

});

router.get('/logout', async (req, res)=>{

    const token = req.headers.authorization?.split(' ')[1];

    if(token){
        await redisClient.set(token, 'blacklisted', {EX: 900})
    }

    res.json({message:'logged out successfully!'});

} )


module.exports = router;