const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.post("/register", async (req, res) => {
    var { email, password,name } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user == null) {
            try {
                let hashPassword = await bcrypt.hash(password, 10);
                try {
                    req.body.password = hashPassword;
                    let user = new User({email:email,password:hashPassword,name:name});
                    let result = await user.save();
                    res.status(201).send({ message: "Registeration success" });
                }
                catch (e) {
                    res.status(400).send(e);
                }
            }
            catch (e) {
                res.status(500).send({ message: "error encrypting password try again" });

            }

        }
        else {
            res.status(409).send({ message: `user with  given email already in use` });
        }
    }
    catch (e) {

    }

});
router.post("/login", async (req, res) => {
    var { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user != null) {
            try {
                let status = await bcrypt.compare(password, user.password);
                if (status) {
                    try {
                        let token = jsonwebtoken.sign({ email: user.email, id: user._id }, "5884yDGdf@%#5", {
                            expiresIn: "365 days"
                        });
                        res.json({ token: token,id:user._id });

                    }
                    catch (e) {
                        res.status(500).send({ message: 'error signin....' });

                    }


                }
                else {
                    res.status(401).send({ message: 'email/password error....' });

                }
            }
            catch (e) {
                res.status(401).send({ message: 'email/password error....' });

            }

        }
        else {
            res.status(401).send({ message: 'email/password error....' });
        }
    }
    catch (e) {
        res.status(500).send({ message: "Server error try again..." });

    }

});
module.exports = router;