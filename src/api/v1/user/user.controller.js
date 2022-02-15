const userService = require('./user.service')
const { AppError } = require('../../../common/error/error');


async function getUser (req, res, next) {
    try {
        req.body.user.password = null;
        res.status(200).json({
            user: req.body.user
        })
    }
    catch(err) {
        next(err)
    }
}

async function updateUser (req, res, next) {
    try {
        const DTO = await userService.updateUser(req.body)
        res.status(200).json({
            message: 'Update successful'
        })
    }
    catch(err) {
        next(err)
    }
}


async function getTeam (req, res, next) {
    try {
        const DTO = await userService.getTeam(req.body)
        res.status(200).json(
            DTO.team
        )
    }
    catch(err) {
        next(err)
    }
}


module.exports = {
    getUser,
    updateUser,
    getTeam
}