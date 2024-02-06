const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
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

export default mongoose.models.seller || mongoose.model("seller", SellerSchema);