const userService = require("./users.service");
const User = require("../users/users.model");
const mongoose = require("mongoose");

// Create a user
exports.createUser = async (req, res) => {
  try {
    // passing the request data directly to the service layer
    const savedUser = await userService.createUser(req.body);

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

    const users = await userService.getUsers();

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

    const user = await userService.getUserById(req.params.id);

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
    const updateUser = await userService.updateUser(req.params.id, req.body);

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
      error: error.message,
    });
  }
};

// Deleting a user
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await userService.deleteUser(req.params.id)

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
