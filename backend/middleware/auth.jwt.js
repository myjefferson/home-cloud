const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config.js')

verifyToken = (req, res, next) => {
    let token = req.headers('x-acess-token');

    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return req.status(401).send({
                error: "Unauthorized!"
            })
        }
        req.userId = decoded.username;
        next();
    });
}

const authJwt = {
    verifyToken: verifyToken
}
module.exports = authJwt