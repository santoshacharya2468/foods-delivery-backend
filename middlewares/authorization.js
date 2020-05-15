
const jsonwebtoken = require("jsonwebtoken");
const authorization = async function (req, res, next) {
    let jwtkey = req.headers['authorization'];
    if (jwtkey == null) {
        return res.status(401).json({ message: "Login to continue..." });
    }
    else {
       
        try {
            var result = jsonwebtoken.verify(jwtkey, "5884yDGdf@%#5");
            req.user = result;
            return next();
        }
        catch (e) {
            return res.status(401).json({ message: e });
        }

    }

}
module.exports = authorization;