const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).json({ message: `Request out of token` });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(
            tokenWithoutBearer,
            process.env.SECRET_JWT
        );
        req.user = { decodedToken };
        return next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized` })
    }
};