'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.PORT || '0.0.0.0';

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
