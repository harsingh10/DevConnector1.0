const config = require("config");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {

    //get the token
    const token = req.header("x-auth-token");
    //check if it exists
    if (!token) {
        res.status(401).json({ msg: "token is not present" });
    }
    //decode the token 
    try {
        console.log(token);
        const Decoded = jwt.verify(token, config.get("secretTOKEN"));

        req.user = Decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: "Token is invalid" });

    }

}