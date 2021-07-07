import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
const bcrypt = require('bcryptjs')
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

            // Password is correct
            const validPass = await bcrypt.compare(req.body.password, user.password)
                if (!validPass) return res.status(400).send('Email or password is incorrect')

            res.status(200).json({ success: true, message: 'Logged in!' })

            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}