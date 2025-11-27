import express from 'express';
import { userRouter } from './users/users.js';

const port = 8000;

const app = express();

app.use((req, res, next) => {
	console.log('Middleware activated');
	next();
});

app.use('/hello', (req, res, next) => {
	console.log('Hello route middleware activated');
	next();
});

app.get('/hello', (req, res) => {
	// res.send('Hello, World!');
	// res.end();
	throw new Error('Some error occurred');
});

app.use('/users', userRouter);

app.use((err, req, res, next) => {
	console.error('Error handling middleware:', err.message);
	res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
	console.log(`Express сервер запущен на http://localhost:${port}/`);
});
