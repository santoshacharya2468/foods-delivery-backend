const appMiddleware = function (req, res, next) {
    let apiKey = req.headers['apikey'];
    if (apiKey != null) {
        if (apiKey == "123#@!") {
            return next();
        }
        else {
            return res.status(403).send("");
        }

    }
    else {
        return res.status(403).send("");
    }
}
module.exports = appMiddleware;