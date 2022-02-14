const express = require('express');
const req = require('express/lib/request');
const { AppError } = require('../../../../common/error/error');
const User = require('../../../../models/user');

async function getUsers({username, email, fullname, student_id}) {
    let query = User.find()

    if (username != null && username != '') {
		query = query.regex('username', new RegExp(username, 'i'));
	}
    if (email != null && email != '') {
		query = query.regex('email', new RegExp(email, 'i'));
	}
    if (fullname != null && fullname != '') {
		query = query.regex('fullname', new RegExp(fullname, 'i'));
	}
    if (student_id != null && student_id != '') {
		query = query.regex('student_id', new RegExp(student_id, 'i'));
	}

    try {
        const users = await query.exec();

        return {
            users
        }
    }
    catch(err) {
        console.log(err)
        throw new AppError(500, err.message);
    }
}

module.exports = {
    getUsers
}





