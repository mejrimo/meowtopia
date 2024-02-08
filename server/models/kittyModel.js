import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const kittySchema = new Schema(
	{
		image: {
			type: String,
			default: 'https://freesvg.org/img/1682268254kawaiicat1.png',
		},
		name: {
			type: String,
			required: [true, "can't be blank"],
			match: [/^[a-zA-Z\sÀ-ÿ']+$/, 'is invalid'],
		},
		gender: {
			type: String,
			enum: ['M', 'F'],
			required: [true, "can't be blank"],
		},
		age: {
			type: String,
			required: [true, "can't be blank"],
		},
		isPeopleFriendly: {
			type: Boolean,
			required: true,
		},
		isAnimalFriendly: {
			type: Boolean,
			required: true,
		},
		isSpecialNeeds: {
			type: Boolean,
			required: true,
		},
		description: {
			type: String,
			required: [true, "can't be blank"],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Kitty', kittySchema);
