const Users = require("./users.model");

// ----------------------------------------------------
// Create a new user
// ----------------------------------------------------

exports.createUser = async (userData) => {
  const newUser = new Users(userData);
  const savedUser = await newUser.save();

  // cleaning up passord hash before sending back to controller
  const userObject = savedUser.toObject(); // converts to plain js object
  delete userObject.passwordHash;
  return userObject;
};

// ----------------------------------------------------
// Get all users
// ----------------------------------------------------

// Finds users, populates department name, and excludes passwordHash from results
exports.getUsers = async () => {
  return await Users.find()
    .populate("departmentId", "name")
    .select("-passwordHash");
};

// ----------------------------------------------------
// Fetch a single user by Id
// ----------------------------------------------------
exports.getUserById = async (id) => {
  return await Users.findById(id)
    .populate("departmentId", "name")
    .select("-passwordHash");
};

// ----------------------------------------------------
// Updating User
// ----------------------------------------------------
exports.updateUser = async (id, updateData) => {
  return await Users.findByIdAndUpdate(id, updateData, {
    new: true, // Returns the modified document
    runValidators: true, // Enforces schema validations on update
  }).select("-passwordHash");
};

// ----------------------------------------------------
// Deleting a user
// ----------------------------------------------------
exports.deleteUser = async (id) => {
    return await Users.findByIdAndDelete(id)
}
