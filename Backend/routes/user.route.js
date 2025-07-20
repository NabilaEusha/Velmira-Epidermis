import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateUserProfile,
  changePassword,
  resetPassword 
} from "../controller/user.controller.js";

// GET ALL USERS ROUTE
router.get("/", getAllUsers);

// UPDATE USER PROFILE ROUTE - PUT THIS BEFORE /:id TO AVOID CONFLICTS
router.put("/update-profile", updateUserProfile);

// CHANGE PASSWORD ROUTE
router.put("/change-password", changePassword);

// GET ONE USER ROUTE
router.get("/find/:userId", getUser);

// UPDATE USER ROUTE - PUT THIS AFTER SPECIFIC ROUTES
router.put("/:id", updateUser);

// DELETE USER ROUTE
router.delete("/:id", deleteUser);

// Password reset endpoint
router.post('/reset-password', resetPassword);


export default router;

// import express from "express";
// import { getAllUsers, getUser, deleteUser, updateUser, resetPassword } from "../controller/user.controller.js";
// const router = express.Router();

// //GET ALL USERS ROUTE
// router.get("/", getAllUsers);

// // DELETE USER ROUTE
// router.delete("/:id", deleteUser);

// // UPDATE USER ROUTE
// router.put("/:id", updateUser);

// //GET ONE USER ROUTE
// router.get("/find/:userId", getUser);

// // Password reset endpoint
// router.post('/reset-password', resetPassword);

// export default router;