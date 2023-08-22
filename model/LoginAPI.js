const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Creating a Schema
const LoginAPISchema = new mongoose.Schema({
    usersId: {
        type: Number,
        unique: true
    },
    firstname: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    lastname: {
        type: String
    },
    userEmail: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "This Email is already exist"]
    },
    userPassword: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
}, {
    timestamps: true
}
)

// Password hashing 

LoginAPISchema.pre('save', async function (next) {

    const user = this;


    if (!user.isModified('userPassword')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(user.userPassword, salt);
        user.userPassword = hashpassword;
        next();
    } catch (error) {
        res.send("Password error")
    }

})


// "User is a Collection Name"
module.exports = mongoose.model("User", LoginAPISchema); // Exporting model 