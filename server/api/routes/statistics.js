const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const statisticsController = require("../controllers/statistics");

router.get("/", authMiddleware, async (req, res) => {
    const userId = req.user.id;

    const statistics = await statisticsController.getStatistics(userId)

    res.status(200).json(statistics)
});

module.exports = router;
