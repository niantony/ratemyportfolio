import dbConnect from '../../../middleware/dbConnect';
import User from '../../../models/User';
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
import cookie from 'cookie'
const { loginValidation } = require('../../validation')

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        // User login
        case 'POST':
            // Validating request data
            const {error} = loginValidation(req.body)
                if (error) return res.status(400).json({ success: false, message: error.details[0].message})

            // Checking if email exists
            const user = await User.findOne({ email: req.body.email })
                if (!user) return res.status(400).send('Email or password is incorrect')

            // Checking is password is correct
            const validPass = await bcrypt.compare(req.body.password, user.password)
                if (!validPass) return res.status(400).send('Email or password is incorrect')

            // Create and assign a token
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET )
            res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                path: '/'
            }))

            res.status(200).json({ success: true, message: 'Logged in!', token: token })
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}