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

//GET @/ - GET all the kitties
const getAllKitties = asyncHandler(async (req, res) => {
	const kitties = await Kitty.find({}).sort({ createdAt: -1 });

	res.status(200).json(kitties);
});

//GET @/:id - GET a single kitty
const getKitty = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const kitty = Kitty.findById(id);

	if (!kitty) {
		return res.status(404).json({ error: 'Kitty not found' });
	}

	res.status(200).json(kitty);
});

//PATCH @/:id - UPDATE a kitty
const updateKitty = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const updatedKitty = await Kitty.findOneAndUpdate(
		{ _id: id },
		{ ...req.body }
	);

	if (!updatedKitty) {
		return res.status(404).json({ error: 'Kitty not found' });
	}

	res.status(200).json({ updatedKitty, message: 'Kitty successfully updated' });
});

//DELETE @/:id - DELETE a kitty
const deleteKitty = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const deletedKitty = await Kitty.findOneAndDelete({ _id: id });

	if (!deletedKitty) {
		return res.status(404).json({ error: 'Kitty not found' });
	}

	res.status(200).json({ deletedKitty, message: 'Kitty successfully deleted' });
});

export { addKitty, getAllKitties, getKitty, updateKitty, deleteKitty };
