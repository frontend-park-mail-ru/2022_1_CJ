'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"))
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
