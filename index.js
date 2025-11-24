import express from 'express';

const port = 8000;

const app = express();

app.get('/hello', (req, res) => {
	res.send('Привет из Express!');
});

app.listen(port, () => {
	console.log(`Express сервер запущен на http://localhost:${port}/`);
});
