const { Router } = require("express");
const router = Router();

const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// /api/auth/register
router.post(
	"/register",
	[
		check("email", "Incorrect email").isEmail(),
		check("password", "Min password length 6 chars").isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: "Incorrect registration data",
					errors: errors.array(),
				});
			}

			const { email, password } = req.body;

			const isExists = await User.findOne({ email });

			if (isExists) {
				return res.status(400).json({
					message: "User already exists",
				});
			}

			const hashPassword = await bcrypt.hash(password, 12);
			const user = new User({ email, password: hashPassword });

			await user.save();

			return res.status(201).json({
				message: "New user created",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "Register user error",
			});
		}
	}
);

// /api/auth/login
router.post(
	"/login",
	[
		check("email", "Enter velid email")
			.normalizeEmail()
			.isEmail(),
		check("password", "Enter password").exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: "Incorrect user data",
					errors: errors.array(),
				});
			}

			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					message: "User not found",
				});
			}

			const isPasswordMath = await bcrypt.compare(password, user.password);
			if (!isPasswordMath) {
				return res.status(400).json({
					message: "Incorrect password. TTry again...",
				});
			}

			const token = jwt.sign(
				{
					useerId: user.id,
				},
				config.get("jwtSecret"),
				{
					expiresIn: "1h",
				}
			);

			res.status(200).json({ token, userId: user.id });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "Login user error",
			});
		}
	}
);

module.exports = router;
