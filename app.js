const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

const port = (process.env.PORT || 8080);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));


