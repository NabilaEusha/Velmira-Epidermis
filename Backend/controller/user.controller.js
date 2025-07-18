import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// UPDATE USER

const updateUser = asyncHandler(async(req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, { $set: req.body }, { new: true }
    );

    if (!updatedUser) {
        res.status(400);
        throw new Error("User was not updated");
    } else {
        res.status(201).json(updatedUser);
    }
});

// DELETE USER
const deleteUser = asyncHandler(async(req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        res.status(400);
        throw new Error("User was not deleted successfully");
    } else {
        res.status(201).json("User was deleted successfully");
    }
});

// GET ONE USER
const getUser = asyncHandler(async(req, res) => {
    const user = await User.findBy(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error("User was not found");
    } else {
        res.status(200).json(user);
    }
});

// GET ALL USERS
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find();
    if (!users) {
        res.status(400);
        throw new Error("Users were not feteched.")
    } else {
        res.status(200).json(users);
    }
})

const resetPassword = async(req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.password = newPassword; // assign plain password, let pre-save hook hash it
        await user.save();

        res.json({ message: 'Password updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

export { getAllUsers, getUser, deleteUser, updateUser, resetPassword };