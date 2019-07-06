const express = require('express');

const app = express();

app.get(' route', (req, res) => {

});

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`Server running on port PORT`));