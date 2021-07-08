import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../../validation')

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        // User registration
        case 'POST':
            // Validating request data
            const {error} = registerValidation(req.body)
                if (error) return res.status(400).json({ success: false, message: error.details[0].message})

            // Checking if user is already in database
            const emailExists = await User.findOne({ email: req.body.email })
                if (emailExists) return res.status(400).send('Email already exists')

            // Hashing password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            // Creating user
            try {
                const new_user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword
                });
                res.status(201).json({ success: true, userId: new_user._id })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}