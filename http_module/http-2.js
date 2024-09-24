const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>GET Method is processed</h1>');

        // Parse the query string from the URL
        const parsedURL = url.parse(req.url, true);
        const { firstname, lastname, username, email, age, gender, phone } = parsedURL.query;

        // Write the form data to the response
        res.write(<h3>First Name: ${firstname}</h3>);
        res.write(<h3>Last Name: ${lastname}</h3>);
        res.write(<h3>Username: ${username}</h3>);
        res.write(<h3>Email: ${email}</h3>);
        res.write(<h3>Age: ${age}</h3>);
        res.write(<h3>Gender: ${gender}</h3>);
        res.write(<h3>Phone Number: ${phone}</h3>);

        res.end();
    } else if (req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>POST Method is processed</h1>');

        let inputs = '';

        req.on('data', (chunk) => {
            inputs += chunk.toString(); // Convert the Buffer to string
        });

        req.on('end', () => {
            const parsedInputs = querystring.parse(inputs);
            res.end(`<h2>Inputs:</h2>
                      <p>First Name: ${parsedInputs.firstname}</p>
                      <p>Last Name: ${parsedInputs.lastname}</p>
                      <p>Username: ${parsedInputs.username}</p>
                      <p>Email: ${parsedInputs.email}</p>
                      <p>Password: ${parsedInputs.password}</p>
                      <p>Age: ${parsedInputs.age}</p>
                      <p>Gender: ${parsedInputs.gender}</p>
                      <p>Phone Number: ${parsedInputs.phone}</p>`);
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.write('<center>Method Not Allowed</center>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running @ http://127.0.0.1:5500/index.html');
});
