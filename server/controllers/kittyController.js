import asyncHandler from 'express-async-handler';
import Kitty from '../models/kittyModel.js';

//POST @/addKitty - ADD a new kitty
const addKitty = asyncHandler(async (req, res) => {
	const data = req.body;

	const newKitty = await Kitty.create(data);

	if (newKitty) {
		res
			.status(201)
			.json({ kitty: newKitty, message: 'Kitty successfully added' });
	} else {
		res.status(400);
		throw new Error('Invalid kitty data');
	}
});

export { addKitty };
