import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//POST @/auth - Authenticate user and set TOKEN
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const loginUser = await User.findOne({ email });

	if (loginUser && (await loginUser.matchPassword(password))) {
		generateToken(res, loginUser._id);

		res.status(201).json({
			_id: loginUser._id,
			name: loginUser.name,
			email: loginUser.email,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

//POST @/register - REGISTER new user
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const newUser = await User.create({ name, email, password });
	if (newUser) {
		generateToken(res, newUser._id);

		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//POST @/logout - RESET cookie and logout user
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: 'User logged out' });
});

//GET @/profile - GET user profile
const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		name: req.user.name,
		email: req.user.email,
		favKittiesId: req.user.favKittiesId,
	};

	res.status(200).json(user);
});

//PATCH @/profile - UPDATE user profile
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
