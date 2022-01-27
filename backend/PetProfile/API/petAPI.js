const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})
let upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.use(bodyParser.json());

const petFunctions = require('../petHelperFunctions/petFunctions');
const petPhotoFunction = require('../petHelperFunctions/petPhoto');

router.post('/createPetProfile', upload.single('file'), (req, res) => {
    const file = req.file;
    console.log(file.filename);
    console.log(file.path);
    console.log(req.body.data);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    petFunctions.post_pet(req.body.data.name, req.body.data.type, req.body.data.breed, req.body.data.availability, req.body.data.sex, req.body.data.age, req.body.data.weight, req.body.data.disposition, req.body.data.description, req.body.data.shelter_id).then(key => {
                petPhotoFunction.uploadPhoto(file.path, key.id);
                res.status(201).send(key);
                return;
        })
})

module.exports = router;