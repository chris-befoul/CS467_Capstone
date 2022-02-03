const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.use('/pets', require('./PetProfile/API/petAPI'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT + '...');
});