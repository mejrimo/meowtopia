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
		},
		age: {
			type: String,
		},
		isPeopleFriendly: {
			type: Boolean,
		},
		isAnimalFriendly: {
			type: Boolean,
		},
		isSpecialNeeds: {
			type: Boolean,
		},
		description: {
			type: String,
			required: [true, "can't be blank"],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Kitty', kittySchema);
