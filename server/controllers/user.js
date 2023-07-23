import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const exisitingUser = await User.findOne({ email })
        if (!exisitingUser) return res.status(401).json("Invalid Credentials")

        const validPwd = await bcrypt.compare(password, exisitingUser.password)

        const token = jwt.sign({ email: exisitingUser.email, id: exisitingUser._id }, 'test', { expiresIn: '2h' })

        res.status(200).json({ result: exisitingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Internal Servere error in signin" })
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).json("User already exists.");

        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords do not match." });

        const hashedPwd = await bcrypt.hash(password, 12);

        const resultUser = await User.create({
            email,
            password: hashedPwd,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign(
            { email: resultUser.email, id: resultUser._id },
            'test',
            { expiresIn: '7d' }
        );

        res.status(200).json({ result: resultUser, token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error in signup" });
    }
};
