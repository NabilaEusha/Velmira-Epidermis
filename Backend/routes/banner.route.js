import express from "express";
const router = express.Router();
import {
    createBanner,
    getAllBanners,
    getRandomBanner,
    deleteBanner,
    updateBannerOrder,
    toggleBannerStatus,
} from "../controller/banner.controller.js";

// CREATE BANNER ROUTE
router.post("/", createBanner);

// GET ALL BANNERS ROUTE
router.get("/", getAllBanners);

// DELETE BANNER ROUTE
router.delete("/:id", deleteBanner);

// UPDATE BANNER ORDER ROUTE
router.put("/order", updateBannerOrder);

// TOGGLE BANNER STATUS ROUTE
router.put("/:bannerId/toggle", toggleBannerStatus);

// GET RANDOM BANNER ROUTE
router.get("/random", getRandomBanner);

export default router;