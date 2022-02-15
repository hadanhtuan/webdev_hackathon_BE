const userService = require('./users.service');

async function getUsers(req, res, next)
{
    try {
        const DTO = await userService.getUsers(req.query)
        res.status(200).json({
            users: DTO.users
        })
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    getUsers
}