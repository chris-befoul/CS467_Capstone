const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Datastore} = require('@google-cloud/datastore');

const petFunctions = require('../PetProfile/petHelperFunctions/petFunctions');
const petPhotoFunction = require('../PetProfile/petHelperFunctions/petPhoto');
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

async function checkDuplicateEmail (email) {
    const q = datastore.createQuery(USER).filter('email', '=', email);
    const [users] = await datastore.runQuery(q);
    let user = users[0];

    if(!user){
        return false;
    } else {
        return true;
    }
}

router.get('/', async(req, res) => {
    getUsers().then((users) => {res.status(200).json(users);});
});

router.post('/register', async(req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const new_user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            email_preference: req.body.email_preference,
            type: req.body.type,
            shelter_name: req.body.shelter_name
        };
        const isDuplicate = await checkDuplicateEmail(new_user.email);
        if (isDuplicate){
            res.status(400).send({'Error': 'Email already exists!'});
        } else{
            insertUser(new_user).then(key => { res.status(201).send({"id": key.id, ...new_user}) });
        }
    } catch {
        res.status(500).send();
    }
});

getQuery = async (email) => {
    const q = datastore.createQuery(USER).filter('email', '=', email);
    const [items] = await datastore.runQuery(q);
    item = items[0];
}

async function searchUser(userID) {
    const key = datastore.key([USER, parseInt(userID, 10)]);
    return datastore.get(key).then((entity) => {
        if (entity[0] === undefined || entity[0] === null) {
            return entity;
        }
        else {
            return entity.map(fromDatastore);
        }
    })
}

router.post('/login', async(req, res) => {
    const userItem = datastore.createQuery(USER).filter('email', '=', req.body.email);
    const [items] = await datastore.runQuery(userItem);
    let user = items[0];
  
    // console.log(user);
    // console.log(user[Datastore.KEY].id);

    if (!user) {
        return res.status(404).send({
            message: 'User not found!'
        });
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Invalid password!'
        });
    }

    const token = jwt.sign({_id: user[Datastore.KEY].id}, "secret");

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.send({
        message: "success",
        user: user
    });
});

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({
                message: 'Unauthenticated!'
            });
        }

        const userKey = datastore.key([USER, parseInt(claims._id)]);
        datastore.get(userKey).then((user) => {
            if (user[0]){
                const {password, ...data} = user[0];
                res.status(200).send({...data, 'id': user[0][Datastore.KEY].id});
            } else{
                res.status(404).send({'Error': 'No user with this id is found!'});
            }
        });
    } catch {
        return res.status(401).send({
            message: 'Unauthenticated!'
        });
    }
});

router.delete('/user', (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({
                message: 'Unauthenticated!'
            });
        }
        const userKey = datastore.key([USER, parseInt(claims._id)]);
        datastore.delete(userKey).then(async () => {
            const q = datastore.createQuery('Pet').filter('shelter_id', '=', claims._id);
            const [pets] = await datastore.runQuery(q);
            if (pets.length > 0){
                pets.map(async (pet) => {
                    await petFunctions.delete_pet(pet[Datastore.KEY].id);
                    await petPhotoFunction.deletePhotosOfPet(pet[Datastore.KEY].id); 
                });
            }

            res.cookie('jwt', '', {maxAge: 0}); // remove cookie when the user is deleted
            res.status(204).send();
        });  
    } catch {
        res.status(500).send();
    }
});

router.patch('/user', async(req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, 'secret');
        
        if (!claims) {
            return res.status(401).send('Unauthenticated!');
        }

        const userKey = datastore.key([USER, parseInt(claims._id)]);
        const user = await datastore.get(userKey);
        
        if (!user[0]){
            return res.status(404).send('No user with this id is found!');
        }

        if (req.body.password){
            if(!await bcrypt.compare(req.body.password, user[0].password)){
                return res.status(400).send("invalid password!");
            }
        }

        const salt = await bcrypt.genSalt();
        var hashedPassword = '';
        if(req.body.new_password === ''){
            hashedPassword = user[0].password;
        } else{
            hashedPassword = await bcrypt.hash(req.body.new_password, salt);
        }
        const updated_user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            email_preference: req.body.email_preference,
            type: req.body.type,
            shelter_name: req.body.shelter_name
        };
        datastore.save({ "key": userKey, "data": updated_user }).then(()=>{
            res.status(200).send('updated!');
        });        
    } catch {
        res.status(500).send();
    }
});

router.post('/logout', (req, res) => {
    // removing cookie
    res.cookie('jwt', '', {maxAge: 0});

    res.send({
        message: "Log out complete!"
    });
});

router.get('/user/:shelter_id', async(req, res) => {
    const user = await searchUser(req.params.shelter_id);
    res.status(201).send(user[0]);
    return;
})

router.delete('/admin/:user_id', async(req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({
                message: 'Unauthenticated!'
            });
        }
        const userKey = datastore.key([USER, parseInt(req.params.user_id)]);
        datastore.get(userKey).then((user) => {
            if (user[0]){
                datastore.delete(userKey).then(async () => {
                    const q = datastore.createQuery('Pet').filter('shelter_id', '=', req.params.user_id);
                    const [pets] = await datastore.runQuery(q);
                    if (pets.length > 0){
                        pets.map(async (pet) => {
                            await petFunctions.delete_pet(pet[Datastore.KEY].id);
                            await petPhotoFunction.deletePhotosOfPet(pet[Datastore.KEY].id); 
                        });
                    }
                    res.status(204).send();
                });  
            } else{
                res.status(404).send({'Error': 'No user with this id is found!'});
            }
        });         
    } catch {
        res.status(500).send();
    }
})

module.exports = router;