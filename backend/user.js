const router = require('express').Router();
const bcrypt = require('bcrypt');
const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
const USER = 'User';

function fromDatastore(item) {
    item.id = item[Datastore.KEY].id;
    delete item["password"]
    return item;
}

function insertUser(new_user){
    var key = datastore.key(USER);
    return datastore.save({ "key": key, "data": new_user }).then(() => { return key });
} 

function getUsers () {
    const q = datastore.createQuery(USER);
    return datastore.runQuery(q).then((entities) => {
        return entities[0].map(fromDatastore);
    });
}

router.get('/', async(req, res) => {
    getUsers().then((users) => {res.status(200).json(users);});
});

router.post('/', async(req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const new_user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            email_preference: req.body.email_preference
        };
        insertUser(new_user).then(key => { res.status(201).send({"id": key.id, ...new_user}) });
    } catch {
        res.status(500).send();
    }
});

module.exports = router;