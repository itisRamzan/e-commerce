const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phoneno: {
        type: Number,
    },
    pincode: {
        type: Number,
    },
    passwordResetToken: {
        type: String,
    },
},{
    timestamps: true,
});

export default mongoose.models.user || mongoose.model("user", UserSchema);