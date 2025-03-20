const jwt = require('jsonwebtoken');

//  function generateToken(user){
//     return jwt.sign({id: user.id},process.env.SECRET_KEY,{expiresIn: '2m'})
//  } 

 const generateToken=(user)=> jwt.sign({id:user.id},process.env.SECRET_KEY,{expiresIn: '2m'});


module.exports = generateToken;