const router = require('express').Router();
const bcrypt = require('bcrypt');
const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
const SHELTER = 'Shelter';

function fromDatastore(item) {
    item.id = item[Datastore.KEY].id;
    delete item["password"]
    return item;
}

function insertUser(new_shelter){
    var key = datastore.key(SHELTER);
    return datastore.save({ "key": key, "data": new_shelter }).then(() => { return key });
} 

function getUsers () {
    const q = datastore.createQuery(SHELTER);
    return datastore.runQuery(q).then((entities) => {
        return entities[0].map(fromDatastore);
    });
}

router.get('/', async(req, res) => {
    getUsers().then((shelters) => {res.status(200).json(shelters);});
});

router.post('/', async(req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(req.body.password, salt);
        const new_shelter = {
            "shelter_name": req.body.shelter_name, 
            "email": req.body.email, 
            "password": hashed_password,
            "city": req.body.city, 
            "state": req.body.state, 
            "zip_code": req.body.zip_code, 
            "phone": req.body.phone
        };
        insertUser(new_shelter).then(key => { res.status(201).send({"id": key.id, ...new_shelter}) });
    } catch {
        res.status(500).send();
    }
});

module.exports = router;