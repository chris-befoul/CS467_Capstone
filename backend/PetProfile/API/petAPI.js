const express = require('express');
const bodyParser = require('body-parser');
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
const router = express.Router();
router.use(bodyParser.json());

const petFunctions = require('../petHelperFunctions/petFunctions');
const petPhotoFunction = require('../petHelperFunctions/petPhoto');


router.get('/', function(req, res) {
    petFunctions.get_all_pets(req.query.shelter).then(async (pets) => {
        await Promise.all(pets.map(async (pet) => {
            pet.photos = await petPhotoFunction.petsPhotos(pet.id);
        }));
        res.status(200).json(pets);
    })
})

router.get('/featuredpets', function(req, res) {
    petFunctions.get_featured_pets().then(async (pets) => {
        await Promise.all(pets.map(async (pet) => {
            pet.photos = await petPhotoFunction.petsPhotos(pet.id);
        }));
        res.status(200).json(pets);
    })
})

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

router.patch('/:petID', multer.array('file'), (req,res) => {
    const data = JSON.parse(req.body.data);
    petFunctions.edit_pet(req.params.petID, data.name, data.type, data.breed, data.availability, data.sex, data.age, data.weight, data.disposition, data.description, data.date_created, data.shelter_id)
        .then( key => { 
            if(req.files && req.files.length > 0) {
                for (var x = 0; x < req.files.length; x++) {
                    const fileName = key.id + '/' + req.files[x].originalname;
                    petPhotoFunction.uploadPhoto(req.files[x], fileName);
                }
            }
            res.status(201).send(key);
            return; });
        return;
})

router.post('/createProfile', multer.array('file'), (req, res) => {
    const data = JSON.parse(req.body.data);
    if (!req.files) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    petFunctions.post_pet(data.name, data.type, data.breed, data.availability, data.sex, data.age, data.weight, data.disposition, data.description, data.shelter_id).then(key => {
                for (var x = 0; x < req.files.length; x++) {
                    const fileName = key.id + '/' + req.files[x].originalname;
                    petPhotoFunction.uploadPhoto(req.files[x], fileName);
                }
                res.status(201).send(key);
                return;
    })
    return;
})

router.delete('/photo', (req, res) => {
    petPhotoFunction.deletePhoto(req.body.fileName).then(() => {
        return res.status(201).send(true);
    })
})

router.delete('/:petID', (req, res) => {
    petFunctions.delete_pet(req.params.petID).then(() => {
        petPhotoFunction.deletePhotosOfPet(req.params.petID);
        return res.status(204).send();
    });
})

module.exports = router;