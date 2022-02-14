const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {AppError} = require('../common/error/error');

const isUser = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {

            token = authHeader.split(' ')[1];

            const decodedToken = await jwt.verify(token, process.env.SECRET);

            const user = await User.findById(decodedToken.id)

            if(!user) {
                throw new AppError(404, 'User not found');
            }

            if (user.role !== 'user') {
                throw new AppError(401, 'Not authorized');
            }

            req.user = user;
            next();
        }
        else {
            throw new AppError(401, 'Not a user');
        }
    }
    catch(err) {
        next(err);
    }
}

module.exports = isUser