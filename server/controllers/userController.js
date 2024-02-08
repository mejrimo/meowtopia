import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//POST @/auth - Authenticate user and set TOKEN
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const loginUser = await User.findOne({ email });

	if (loginUser && (await loginUser.matchPassword(password))) {
		const token = generateToken(loginUser._id);

		res.status(201).json({
			_id: loginUser._id,
			name: loginUser.name,
			email: loginUser.email,
			favKittiesId: loginUser.favKittiesId,
			token,
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
		const token = generateToken(newUser._id);

		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			favKittiesId: newUser.favKittiesId,
			token,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//GET @/profile - GET user profile
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const { token } = req;
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			favKittiesId: user.favKittiesId,
			token,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//PATCH @/profile - UPDATE user profile
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const { token } = req;

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
			favKittiesId: updatedUser.favKittiesId,
			token,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//DELETE @/profile - DELETE user
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		await User.deleteOne(user._id);
		res.status(200).json({
			deletedUser: {
				_id: user._id,
				name: user.name,
				email: user.email,
			},
			message: 'User successfully deleted',
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//POST @/profile/favorites/:kittyId - ADD/REMOVE a kitty from user's favorites list
const changeFavorites = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	const { kittyId } = req.params;

	if (user) {
		const { token } = req;
		if (user.favKittiesId.includes(kittyId)) {
			// user.favKittiesId = user.favKittiesId.filter((id) => id !== kittyId);
			const index = user.favKittiesId.indexOf(kittyId);
			if (index !== -1) {
				user.favKittiesId.splice(index, 1);
			}
			const updatedUser = await user.save();
			res.status(200).json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				favKittiesId: updatedUser.favKittiesId,
				token,
			});
		} else {
			user.favKittiesId.push(kittyId);
			const updatedUser = await user.save();
			res.status(200).json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				favKittiesId: updatedUser.favKittiesId,
				token,
			});
		}
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	deleteUser,
	changeFavorites,
};
