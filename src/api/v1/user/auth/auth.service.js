const express = require('express');
const { loginUserSchema, signupUserSchema } = require('../../../../validators/user');
const { AppError } = require('../../../../common/error/error');
const User = require('../../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

async function login(body) {
    try {
        const { error, value } = loginUserSchema.validate({
            username: body.username,
            password: body.password
        })

        if(error) {
            console.log(error)
            throw new AppError(400, 'Invalid username or password');
        }

        const user = await User.findOne({ username: body.username });

        if (!user) {
            throw new AppError(404, 'Wrong username or password');
        }

        const passcmp = await bcrypt.compare(body.password, user.password);

        
        if(passcmp) {
            user.password = null;
            
            return {
                user: user,
                token: jwt.sign({ id: user._id }, process.env.SECRET)
            }
        }
        else {
            throw new AppError(404, 'Wrong username or password');
        }
    }
    catch(err) {
        console.log(err)
        throw new AppError(500, err.message);
    }
}

async function signup(body) {

    const { error, value } = signupUserSchema.validate({
        username: body.username,
        email: body.email,
        password: body.password,
        fullname: body.fullname,
        school: body.school,
        major: body.major,
        student_id: body.student_id,
        phone_number: body.phone_number, 
        facebook: body.facebook,
        short_introduction: body.short_introduction,
        personal_registration: body.personal_registration
    });

    if(error) {
        console.log(error)
        throw new AppError(400, 'Wrong some field');
    }

    try {
        const user = await User.findOne({
            $or: [ {username: body.username} ,{email: body.email} ]
        })

        if(user) {
            throw new AppError(409, 'User or email already exit');
        }

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(body.password, salt);
        if (hash.err) 
            throw err;

        body.password = hash;

        body.user_code = crypto.randomBytes(6).toString("hex");

        const user2 = await User.create(body)

        user2.password = null

        return {
            user: user2,
            token: jwt.sign({ id: user2._id }, process.env.SECRET)
        }
    }
    catch(err)
    {
        console.log(err)
        throw new AppError(500, err.message);
    }
    


}

module.exports = {
    login,
    signup
}
