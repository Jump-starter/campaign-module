const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { handleLevelsRequest, handleAboutInfoRequest } = require('./handlers/getRequests.js');
const { handleWriteUser, handleWritePledge } = require('./handlers/postRequests.js');

let app = express();
let port = process.env.PORT || 3003;

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use('/:projectId', express.static(`${__dirname}/../client/dist`));

// Routes
app.get('/levels/:projectId', handleLevelsRequest);
app.get('/about/:projectId', handleAboutInfoRequest);
app.post('/users', handleWriteUser);
app.post('/:projectId/:levelId/:pledgeAmount', handleWritePledge);


app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});
