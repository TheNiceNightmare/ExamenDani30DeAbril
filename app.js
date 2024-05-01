const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const num1 = parseFloat(parsedBody.numero1);
            const num2 = parseFloat(parsedBody.numero2);
            const num3 = parseFloat(parsedBody.numero3);

            const suma = num1 + num2;
            const resultado1 = `R1 = ${suma}`;
            const resultado2 = `R2 = ${(suma * num3)}`;

            res.setHeader('Content-Type', 'text/html');
            res.end(`${resultado1}<br>${resultado2}`);
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(`<form method="POST">
                    <label for="numero1">Numero 1:</label>
                    <input type="text" name="numero1" required><br><br>

                    <label for="numero2">Numero 2:</label>
                    <input type="text" name="numero2" required><br><br>

                    <label for="numero3">Numero 3:</label>
                    <input type="text" name="numero3" required><br><br>

                    <button type="submit">Calcular</button>
                 </form>`);
    }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
