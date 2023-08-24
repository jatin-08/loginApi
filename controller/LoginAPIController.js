const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const user = require("../model/LoginAPI");
const counter = require("../model/CounterModel");

// const authmiddleware = require("../middleware/authMiddleware");

// Find All
exports.getAllDetails = async (req, res) => {
    try {
        const details = await user.find();
        console.log(details.length);
        if (details.length === 0) {
            res.status(400).json({ error: "No users are present" });
        } else {
            res.json({ data: details, statusbar: "success" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Find the specfic user

exports.specificDetails = asyncHandler(async (req, res) => {
    const specificdata = await user.findOne({ usersId: req.params.id });
    console.log(specificdata);
    if (!specificdata) {
        res.status(404).json({ error: "User Not found" });
    } else {
        res.json({ data: specificdata, statusbar: "success" });
        // console.log(res.headers);
    }

});

// function for creating a single user or document

exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, userEmail, userPassword, contactNumber } = req.body;
        // console.log(req.body);
        let seqid;
        const seq = await counter.findOneAndUpdate(
            { id: 'incval' },
            { $inc: { seqId: 1 } },
            { new: true }
        ).exec();
        if (seq === null) {
            const newval = new counter({ id: "incval", seqId: 1 })
            await newval.save();
            seqid = 1;
        } else {
            seqid = seq.seqId;
        }
        console.log(seqid);
        if (!firstname || !userEmail || !userPassword || !contactNumber) {
            return res.status(400).json({ error: "All fields are required to fill!" });
        }
        const existingMail = await user.findOne({ userEmail });
        if (existingMail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newUser = new user({
            ...req.body,
            usersId: seqid,
        });
        const insertdata = await newUser.save();
        res.status(201).json(insertdata);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// login function

exports.login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const userexist = await user.findOne({ userEmail });
        // console.log(userexist);
        if (!userexist) {
            return res.status(404).json({ error: "email or password is invalid!" })
        }
        const ispassword = await bcrypt.compare(userPassword, userexist.userPassword);
        if (!ispassword) {
            return res.status(404).json({ error: "email or password is invalid!" })
        }
        const token = jwt.sign({ usersId: userexist.usersId }, process.env.SECRET_KEY, { expiresIn: "1h" });
        // res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
        res.status(200).json({ success: "login Successfully", token: token });
        // console.log(JSON.stringify(req.headers));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// logout function

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: "Logout Successfully!" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Update function

exports.updaterole = async (req, res) => {
    try {
        const userId = req.params.id;
        const role = await user.findOneAndUpdate({ usersId: userId }, req.body, { new: true });
        if (!role) {
            res.status(500).json({ error: "user not found" })
        } else {
            res.status(201).json({ data: role, statusbar: "success" })
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete function and Exporting as well as

exports.deleteUser = async (req, res) => {
    try {
        const usersId = req.params.id;
        // console.log(usersId);
        const dusers = await user.findOneAndDelete({ usersId: usersId });
        if (!dusers) {
            res.status(500).json({ error: "No user found" })
        } else {
            res.status(201).json({ data: dusers, statusbar: "success" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}