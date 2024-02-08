import dotenv from 'dotenv';
dotenv.config();

import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { errorHandler, notFound } from './middleware/errorHandlers.js';
import userRoutes from './routes/userRoutes.js';
import kittyRoutes from './routes/kittyRoutes.js';

//ENV VARIABLES
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

// EXPRESS APP
const app = express();

//MIDDLEWARES
//for security http header
app.use(helmet());
//MONGOOSE SETTING to sanitize query's inputs
mongoose.set('sanitizeFilter', true);
//parse incoming cookies and make them available to the application
app.use(cookieParser());
//parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON requests
app.use(express.json());
//cors
app.use(cors());
// {
// 		origin: 'https://meowtopia-jrnc.onrender.com', //'https://meowtopia-jrnc.onrender.com',
// 		credentials: true,
// 	}

//DEBUG middleware
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//ROUTES
app.use('/api/users', userRoutes);
app.use('/api/kitties', kittyRoutes);

//ERRORHANDLER
app.use(notFound);
app.use(errorHandler);

//CONNECTION TO DB
mongoose
	.connect(URI)
	.then(() => {
		//LISTEN FOR REQUEST
		app.listen(PORT, () => {
			console.log('Connected to DB and listening on port', PORT);
		});
	})
	.catch((err) => {
		console.log(`error:${err.message}`);
		process.exit(1);
	});
