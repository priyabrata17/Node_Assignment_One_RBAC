
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        emum: ["superAadmin", "admin", "manager", "employee"],
        default: "employee"
    }
});

module.exports = mongoose.model("User", UserSchema);