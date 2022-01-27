'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.enable('trust proxy');

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const userRoute = require('./user');
const shelterRoute = require('./shelter');
app.use('/users', userRoute);
app.use('/shelters', shelterRoute);
app.use('/pets', require('./PetProfile/API/petAPI'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});