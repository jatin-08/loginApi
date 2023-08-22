const jwt = require("jsonwebtoken");

const loginModel = require("../model/LoginAPI");

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).json({ error: "Authentication is required!" });
    }
    try {
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
        res.usersId = verifytoken.usersId;
        next();
    } catch (error) {
        res.status(500).json({ error: "Invalid User!" });
    }
}