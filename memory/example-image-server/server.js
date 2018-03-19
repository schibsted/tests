const express = require('express');
const jdenticon = require('jdenticon');

const app = express();

const port = 8111;

// Example: 'GET /png/billy/300' will return a 300x300 png for the identifier 'billy'
app.get('/png/:identifier/:size', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.send(jdenticon.toPng(req.params.identifier, Number.parseInt(req.params.size, 10)));
});

// Example: 'GET /svg/billy/300' will return a 300x300 svg for the identifier 'billy'
app.get('/svg/:identifier/:size', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(jdenticon.toSvg(req.params.identifier, Number.parseInt(req.params.size, 10)));
});

app.listen(port, () => console.log(`Image server running on port ${port}`));
