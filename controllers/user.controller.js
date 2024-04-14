import User from "../models/user.js";
import moment from "moment";
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const {filters, sorting, pagination} = req.body;
        const {email} = filters || {};
        const {pageSize = -1, pageNumber = 1} = pagination || {};
        let query = User.find();
        if (email) {
            query = query.findOne({email});
        }
        if (sorting && sorting.length > 0) {
            sorting.map(({field, order}) => {
                if (field && order && (order === 1 || order === -1))
                    query = query.sort({[field]: order});
            })
        }
        if (pageSize !== -1) {
            const countAll = await User.countDocuments();
            const skip = (pageNumber - 1) * pageSize;
            query = query.skip(skip).limit(pageSize);
        }
        const users = await query;
        res.status(200).json({
            msg: 'Get users successfully!',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });    }
}

export const createUser = async (req, res) => {
    try {

        const { email, password, fullName=null, birthday=null, hometown=null, nation='Vietnam' } = req.body;
        // 1. validation
        if (!email ||!password) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }
        if (birthday && !moment(birthday, 'DD/MM/YYYY', true).isValid()) {
            return res.status(400).json({ message: 'Invalid birthday date!' });
        }
        // 2. check if user exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: 'User already exists!' });
        }
        // 3. hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // 4. create user
        const newUser = new User({
            email,
            password: hashedPassword,
            fullName,
            birthday,
            hometown,
            nation
        });
        const savedUser = await newUser.save();

        return res.status(201).json({ 
            msg: 'Created user successfully!'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });    }
}

export const updateUser = async (req, res) => {
    try {
        const { email, password, fullName=null, birthday=null, hometown=null, nation='Vietnam' } = req.body; // => c1
        // const {id} = req.params; => c2 /:id
        // 1. validation
        if (!email ||!password) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }
        if (birthday && !moment(birthday, 'DD/MM/YYYY', true).isValid()) {
            return res.status(400).json({ message: 'Invalid birthday date!' });
        }
        // 2. check if user exists
        const user = await User.findOne({ email }); // => c1
        // const user = await User.findById(id); => c2
        if (!user) {
            return res.status(401).json({ message: 'User does not exist!' });
        }
        // 3. hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. update user
        user.email = email;
        user.password = hashedPassword;
        user.fullName = fullName;
        user.birthday = birthday;
        user.hometown = hometown;
        user.nation = nation;
        const updatedUser = await user.save();
        return res.status(200).json({ 
            msg: 'Updated user successfully!',
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        // 1. validation
        if (!email) {
            return res.status(400).json({ message: 'Email is required!' });
        }
        // 2. check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist!' });
        }
        // 3. delete user
        await User.findOneAndDelete({ email });
        return res.status(200).json({ 
            msg: 'Deleted user successfully!'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}