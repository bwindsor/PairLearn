// Read in environment variables
require('dotenv').config({ path: './process.env' });
var app = require('../src/main/app.js').default;
app.listen(8080);