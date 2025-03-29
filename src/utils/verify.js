const jwt = require('jsonwebtoken');
const User = require('../auth/user.model');

const redis = require('redis');
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});
redisClient.on('error',err => console.error('Redis Error on:',err));

redisClient.connect()

const verifyToken = async (req,res,next)=>{
    
    const authHeader = req.headers.authorization ;

    if(!authHeader){
        res.status(401).json({message:'missing token!'})
    }
    
    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(403).json({message: 'invalid token!'})
    }

    const isBlackListed = await redisClient.get(token);
    console.log({isBlackListed})
    if(isBlackListed){
        return res.status(401).json({message: 'token expired!'})
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err,decode)=>{
        if(err){
            return res.status(403).json({message:'invalid token'})
        }

        const user = await User.findOne({_id: decode.id});

        if(!user){
            return res.status(404).json({message:'user not found!'})
        }

        req.user = user ;
        next();

    })

};

module.exports = verifyToken ;