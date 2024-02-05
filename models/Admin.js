const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
},{
    timestamps: true,
});

export default mongoose.models.admin || mongoose.model("admin", AdminSchema);