// Read in environment variables
require('dotenv').config({ path: './process.env' });
var app = require('../lib/main/app.js').default;
app.listen(8080);