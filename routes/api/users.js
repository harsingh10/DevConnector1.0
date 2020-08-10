const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require("../../model/Users");
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
// @route  POST api/users
// @desc   TEST route
// @access public  
router.post("/",
    [
        check("name", "the name field is required").not().isEmpty(),
        check("email", "It must be email and it must exist").isEmail(),
        check("password", "password must be of length 5 or 6 minimum").isLength({ min: 6 })
    ]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {


            //check if the user alreadye xists
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({ errors: [{ msg: "User already exists" }] });

            }

            //extract its gravatar 

            const avatar = await gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            })

            user = new User({
                name,
                email,
                password,
                avatar
            })
            //encrypt the password with help of the bcryptjs
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //return json webtoken

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get("secretTOKEN"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token })
                }

            );

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error!");

        }


    });

module.exports = router;
