import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: Number,
        default: 0,
    },
    sessionId: {
        type: String,
        required: true,
    },
    paid: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;