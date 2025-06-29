import Banner from "../models/banner.model.js";
import asyncHandler from "express-async-handler";

// CREATE BANNER
const createBanner = asyncHandler(async(req, res) => {
    // Get the highest order number and add 1
    const lastBanner = await Banner.findOne().sort({ order: -1 });
    const newOrder = lastBanner ? lastBanner.order + 1 : 0;

    const newBanner = new Banner({
        ...req.body,
        order: newOrder
    });
    const savedBanner = await newBanner.save();

    if (!savedBanner) {
        res.status(400);
        throw new Error("Banner was not created");
    } else {
        res.status(200).json(savedBanner);
    }
});

// DELETE BANNER
const deleteBanner = asyncHandler(async(req, res) => {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
        res.status(400);
        throw new Error("Banner was not deleted");
    } else {
        res.status(201).json("Banner was deleted successfully");
    }
});

//GET ALL BANNERS
const getAllBanners = asyncHandler(async(req, res) => {
    const banners = await Banner.find().sort({ order: 1 });
    if (!banners) {
        res.status(400);
        throw new Error("Banners were not fetched or something went wrong");
    } else {
        res.status(200).json(banners);
    }
});

// UPDATE BANNER ORDER
const updateBannerOrder = asyncHandler(async(req, res) => {
    const { bannerId, newOrder } = req.body;

    const banner = await Banner.findById(bannerId);
    if (!banner) {
        res.status(404);
        throw new Error("Banner not found");
    }

    const oldOrder = banner.order;

    if (newOrder > oldOrder) {
        // Moving down: decrease order of banners between old and new position
        await Banner.updateMany({ order: { $gt: oldOrder, $lte: newOrder } }, { $inc: { order: -1 } });
    } else if (newOrder < oldOrder) {
        // Moving up: increase order of banners between new and old position
        await Banner.updateMany({ order: { $gte: newOrder, $lt: oldOrder } }, { $inc: { order: 1 } });
    }

    banner.order = newOrder;
    const updatedBanner = await banner.save();

    res.status(200).json(updatedBanner);
});

// TOGGLE BANNER STATUS
const toggleBannerStatus = asyncHandler(async(req, res) => {
    const { bannerId } = req.params;

    const banner = await Banner.findById(bannerId);
    if (!banner) {
        res.status(404);
        throw new Error("Banner not found");
    }

    banner.isActive = !banner.isActive;
    const updatedBanner = await banner.save();

    res.status(200).json(updatedBanner);
});

// GET RANDOM BANNNER
const getRandomBanner = asyncHandler(async(req, res) => {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });

    if (!banners || banners.length === 0) {
        res.status(400);
        throw new Error("No active banners found");
    } else {
        const randomIndex = Math.floor(Math.random() * banners.length);
        const randomBanner = banners[randomIndex];
        res.status(200).json(randomBanner);
    }
});

export { getAllBanners, createBanner, deleteBanner, getRandomBanner, updateBannerOrder, toggleBannerStatus };