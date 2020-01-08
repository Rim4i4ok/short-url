const { Router } = require("express");
const router = Router();
const config = require("config");

const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");

router.post("/generate", async (req, res) => {
	try {
		const baseUrl = config.get("baseUrl");
		const { from } = req.body;
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Generate link error",
		});
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const links = await Link.find({ owner: req.user.userId });
		res.json(links);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Get links error",
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const link = await Link.findById(req.params.id);
		res.json(link);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Get link error",
		});
	}
});

module.exports = router;
