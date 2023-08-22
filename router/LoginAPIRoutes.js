const express = require("express");

const userController = require("../controller/LoginAPIController");
const authmiddleware = require("../middleware/authMiddleware");

const router = express.Router();


//Route for creating user 

router.post("/signup", userController.signup);

// Route for login

router.post("/login", userController.login);

// Route for logout

router.get("/logout", authmiddleware, userController.logout);

// Route for getting all the user

router.get("/", authmiddleware, userController.getAllDetails);

// Route for getting specific data

router.get("/:id", authmiddleware, userController.specificDetails);

// router.get("/:password",userController.findMultipleUser);

// Route for updating the specific data

router.put("/:id", authmiddleware, userController.updaterole);

// Route for deleting the specific data

router.delete("/:id", authmiddleware, userController.deleteUser);


module.exports = router;