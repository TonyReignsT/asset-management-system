// const userService = require('../services/userService')
const User = require("../models/user");
const mongoose = require('mongoose')

// Create a user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    // To avoid returning passwordHash in the response
    const userResponse = savedUser.toObject(); // converts to plain js object
    delete userResponse.passwordHash;

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: userResponse,
    });
  } catch (error) {
    // To catch duplicate key errors (MongoDB Error Code 11000 for email or staffNumber)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Staff number or Email already exists",
      });
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Yooh!! What if password is being updated? - Rem. to hash it. Ps. Reigns

    // Finds users, populates department name, and excludes passwordHash from results
    const users = await User.find()
      .populate("departmentId", "name")
      .select("-passwordHash");
    // res.json(users)

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.mesage });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    // Validate ID before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const user = await User.findById(req.params.id)
      .populate("departmentId", "name")
      .select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Updating User
exports.updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns the modified document
      runValidators: true, // Enforces schema validations on update
    }).select("-passwordHash");

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Staff number or Email already exists",
      });
    }
    res.status(400).json({
      success: false,
      error: error.mesage,
    });
  }
};

// Deleting a user
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        error: "User not found!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
