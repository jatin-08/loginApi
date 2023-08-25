const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const loginModel = require("../model/LoginAPI");

module.exports = asyncHandler(async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // console.log(authHeader);
    token = token.replace(/^Bearer\s+/, "");
    console.log(token);

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            console.log("before token");
            // res.json({success: "Token is verfied"});
            console.log("after token");
            req.decoded = decoded;
            next();
        });
    } else {
        return res.json({
            success: false,
            message: 'Token not provided'
        });
    }
});