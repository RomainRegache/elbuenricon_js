const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') return false;

    const matches = headerValue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2]
}

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    
        if (!token) {
            return res.status(401).send();
        }
    
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                res.status(401).send();
            } else {
                req.pseudo = decodedToken.pseudo;
                return next()
            }
        });
    }
}