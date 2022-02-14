const express = require('express');
const authService = require('./auth.service')

async function login(req, res, next) {
    try {
        const DTO = await authService.login(req.body)
        res.status(200).json({
            token: DTO.token,
            user: DTO.user
        })
    }
    catch(err) {
        next(err)
    }
}

async function signup(req, res, next) {
    try {
        const DTO = await authService.signup(req.body)
        res.status(201).json({
            token: DTO.token,
            user: DTO.user
        })
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    login,
    signup
}
