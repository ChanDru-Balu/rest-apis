const jwt = require('jsonwebtoken');

const generateToken=(user)=> jwt.sign({id:user.id},process.env.SECRET_KEY,{expiresIn: '15m'});

module.exports = generateToken;