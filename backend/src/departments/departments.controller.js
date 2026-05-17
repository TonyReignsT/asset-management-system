const mongoose = require("mongoose"); // for ObjectId validation
const Department = require("../departments/departments.model");

// create a department
exports.createDepartment = async (req, res) => {
  try {
    // validating before saving
    if (req.body.code) {
      req.body.code = req.body.code.toUpperCase();
    }
    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();

    const deptResponse = savedDepartment.toObject();

    res.status(201).json({
      success: true,
      message: "Department Created Successfully",
      data: deptResponse,
    });
  } catch (error) {
    if (error.code === 11000) {
      // checks the error object to see if it was 'name' or 'code'
      const field = Object.keys(error.keyPattern)[0]; // This extracts the field that failed (name or code). Tells the user which part of their input caused the problem
      return res.status(400).json({
        success: false,
        error: `A department with this ${field} already exists.`,
      });
    }

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    // validating id before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format!",
      });
    }

    // Querying the database
    const department = await Department.findById(req.params.id);

    // If not found
    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

      // return result
      res.status(200).json({
        success: true,
        data: department,
      });
     
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
