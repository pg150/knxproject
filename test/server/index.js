const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./app/routes');
router(app);

app.listen(port, () => {
    console.log('Listening on ' + port);
});
app.use(morgan('combined'));
app.use(bodyParser.json()); // parse application/json
app.use(cors());

exports = module.exports = app;