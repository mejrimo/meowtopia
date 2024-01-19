import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

const idChecker = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	// VERIFY IF THE ID IN THE PARAMS IS A VALID MONGODB ID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Id not valid' });
	}

	next();
});

export default idChecker;
