const fs = require('fs'),
    jwt = require('jsonwebtoken');

const privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
const publicKEY = fs.readFileSync('./keys/public.key', 'utf8');

const issuer   = 'Issuer';         // Issuer 
const subject  = 'some@user.com';  // Subject 
const audience = 'http://foo.com'; // Audience

// SIGNING OPTIONS
const signOptions = {
    issuer,
    subject,
    audience,
    expiresIn: "1h",
    algorithm: "RS256"
};

exports.createToken = payload => {
    return jwt.sign(payload, privateKEY, signOptions);
};

exports.checkToken = (req, res, next) => {

    try {

        let token = req.headers.authorization;

        jwt.verify(token, publicKEY, signOptions);

        req.authToken = jwt.decode(token, { complete: true });

    } catch (err) {
        if (err.message === "jwt expired") {
            return res.status(401).send({ "message": "Your token is expired" });
        }else{
            return res.status(400).send({ "message": "Please, send a valid authorization token in the header" });
        }
    }        

    return next();

};