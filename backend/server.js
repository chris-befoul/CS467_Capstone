'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(cors({
  credentials: true,
  // origin: [ 'http://localhost:3000', 'http://localhost:8080', 'https://cs467-sandbox.ue.r.appspot.com','http://cs467-sandbox.ue.r.appspot.com']
  origin: ['http://localhost:3000', 'http://localhost:8080', 'https://capstone-animal-adoption-app.wl.r.appspot.com','http://capstone-animal-adoption-app.wl.r.appspot.com']
}));
app.options('*', cors());
app.enable('trust proxy');
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const userRoute = require('./user');
const shelterRoute = require('./shelter');
app.use('/api', routes);
app.use('/users', userRoute);
app.use('/shelters', shelterRoute);
app.use('/pets', require('./PetProfile/API/petAPI'));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});