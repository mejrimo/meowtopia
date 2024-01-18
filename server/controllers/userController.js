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
			favKittiesId: loginUser.favKittiesId,
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
			favKittiesId: newUser.favKittiesId,
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

export { authUser, registerUser, logoutUser };