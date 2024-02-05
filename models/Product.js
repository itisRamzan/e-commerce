const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    availableQty: {
        type: Number,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    
},{
    timestamps: true,
});

export default mongoose.models.product || mongoose.model("product", ProductSchema);