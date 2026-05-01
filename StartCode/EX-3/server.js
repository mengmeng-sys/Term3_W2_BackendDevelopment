// server.js
const http = require('http');
const fs = require('fs');
const { error } = require('console');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const name = new URLSearchParams(body).get('name');
            console.log('Recieved name: ',name);
            //Bonus : Var that name is not empty
            if (!name || name.trim()===''){
                res.writeHead(400,{'Content-Type': 'text/html'});
                return res.end('<h2>Error: Name cannot be empty!</h2><a href="/contact">Go back</a>');
            }
            const line = `Name: ${name.trim()} | Submitted at : ${new Date().toISOString()}\n`;

            // Save name to text file  
            fs.appendFile('submissions.txt',line,(err)=>{
                if(err){
                    console.error('Failed to save submission: ',err);
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    return res.end('<h2>Server Error: Could not save submission.</h2>');
                }
                //Bonus: Send back a confirmation html page 
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(`<h2>Thank you, ${name.trim()}!</h2>
                    <p>Your submission has been saved.</p>
                    <a href="/contact">Submit another</a>`
                );
            })     
        });


      
        return;
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
