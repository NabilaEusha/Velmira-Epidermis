import mongoose from "mongoose";
const BannerSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    subtitle: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Banner = mongoose.model("Banner", BannerSchema);
export default Banner;