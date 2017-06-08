// Read in environment variables
require('dotenv').config({ path: './process.env' });
process.title = "pairlearn";
var app = require('../lib/main/app.js').default;
app.listen(process.env.PORT || 8080);