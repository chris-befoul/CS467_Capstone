const router = require('express').Router();
const {Datastore} = require('@google-cloud/datastore');
const petPhotoFunction = require('./PetProfile/petHelperFunctions/petPhoto');


const datastore = new Datastore();
const PET = 'Pet';

function fromDatastore(item) {
    item.id = item[Datastore.KEY].id;
    delete item["password"]
    return item;
}

const getPets = () => {

    const q = datastore.createQuery(PET);
    return datastore.runQuery(q).then((entities => {
        return entities[0].map(fromDatastore);
    }));
}

router.get('/', async(req, res) => {
    getPets().then((pet) => {res.status(200).json(pet);});
    // res.send(pets);
});

module.exports = router;