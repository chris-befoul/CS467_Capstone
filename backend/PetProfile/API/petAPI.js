const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const os = require('os');
// const storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, 'uploads')
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, `${file.originalname}`)
//     }
// })
const upload = multer({ dest: os.tmpdir() });
const directory = os.tmpdir();
const router = express.Router();
router.use(bodyParser.json());

const petFunctions = require('../petHelperFunctions/petFunctions');
const petPhotoFunction = require('../petHelperFunctions/petPhoto');

router.get('/:petID', function(req, res) {
    petFunctions.get_pet(req.params.petID).then( async(pet) => {
        if (pet[0] === undefined || pet[0] === null) {
            res.status(404).json({ 'Error': 'No pet with this petID exists' });
            return;
        }
        else {
            const petFiles = await petPhotoFunction.petsPhotos(req.params.petID);
            const petData = {
                data: pet[0],
                photos: petFiles
            };
            res.status(200).json(petData);
            return;
        }
    })
})

router.patch('/:petID', upload.array('file'), (req,res) => {
    const data = JSON.parse(req.body.data);
    petFunctions.edit_pet(req.params.petID, data.name, data.type, data.breed, data.availability, data.sex, data.age, data.weight, data.disposition, data.description, data.date_created, data.shelter_id)
        .then( key => { 
            if(req.files) {
                for (var x = 0; x < req.files.length; x++) {
                    const fileName = key.id + '/' + (x + 1);
                    petPhotoFunction.uploadPhoto(req.files[x].path, fileName);
                }
                // fs.readdir(directory, (err, files) => {
                //     if (err) throw err;
                
                //     for (const file of files) {
                //     fs.unlink(path.join(directory, file), err => {
                //         if (err) throw err;
                //     });
                //     }
                // });   
            }
            res.status(201).send(key);
            return; });
        return;
})

router.post('/createProfile', upload.array('file'), (req, res) => {
    const data = JSON.parse(req.body.data);
    if (!req.files) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    petFunctions.post_pet(data.name, data.type, data.breed, data.availability, data.sex, data.age, data.weight, data.disposition, data.description, data.shelter_id).then(key => {
                for (var x = 0; x < req.files.length; x++) {
                    const fileName = key.id + '/' + (x + 1);
                    petPhotoFunction.uploadPhoto(req.files[x].path, fileName);
                }
                // fs.readdir(directory, (err, files) => {
                //     if (err) throw err;
                  
                //     for (const file of files) {
                //       fs.unlink(path.join(directory, file), err => {
                //         if (err) throw err;
                //       });
                //     }
                //   });
                res.status(201).send(key);
                return;
    })
    return;
})

router.delete('/photo', (req, res) => {
    petPhotoFunction.deletePhoto(req.data).then(() => {
        return res.status(201);
    })
})

module.exports = router;