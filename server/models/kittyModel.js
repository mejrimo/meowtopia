import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const kittySchema = new Schema({});

export default mongoose.model('Kitty', kittySchema);
