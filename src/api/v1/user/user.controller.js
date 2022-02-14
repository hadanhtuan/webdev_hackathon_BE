const userService = require('./user.service')
const { AppError } = require('../../../common/error/error');


async function getUser (req, res, next) {
    try {
        res.status(200).json({
            user: req.user
        })
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    getUser
}