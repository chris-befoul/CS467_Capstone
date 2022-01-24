const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const petFunctions = require('../petHelperFunctions/petFunctions');

router.post('/createPetProfile', function(req, res) {
    console.log(req.body);
    petFunctions.post_pet(req.body.name, req.body.type, req.body.breed, req.body.availability, req.body.sex, req.body.age, req.body.weight, req.body.disposition, req.body.description, req.body.shelter_id).then(key => {
        res.status(201).send(key);
        return;
    })
    return;
})

module.exports = router;