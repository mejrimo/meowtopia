import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}

	const token = authorization.split(' ')[1];

	try {
		const { _id } = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(_id).select('_id');
		req.token = token;
		next();
	} catch (err) {
		res.status(401);
		throw new Error('Not authorized, invalid token');
	}
});

export { protect };
