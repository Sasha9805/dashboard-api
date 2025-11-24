import http from 'http';

const host = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
	console.log(`Получен запрос: ${req.method} ${req.url}`);
	switch (req.method) {
		case 'GET':
			switch (req.url) {
				case '/hello':
					res.statusCode = 200;
					res.setHeader('Content-Type', 'text/plain');
					res.end('Привет!');
					break;
			}
			break;
	}
	
});

server.listen(() => {
	console.log(`Сервер запущен`);
	const address = server.address();
	const { port: localPort, address: addr } = address;
	console.log(`Адрес: ${addr}`);
	console.log(`Адрес: http://localhost:${localPort}/`);
});

// server.listen(port, host, () => {
// 	console.log(`Сервер запущен на http://${host}:${port}/`);
// });