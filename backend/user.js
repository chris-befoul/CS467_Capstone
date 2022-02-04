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

router.post('/', async(req, res) => {
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
            phone: req.body.phone
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

router.get('/:id', (req, res) => {
    try {
        const userKey = datastore.key([USER, parseInt(req.params.id)]);
        datastore.get(userKey).then((user) => {
            if (user[0]){
                res.status(200).send({...user[0], 'id': user[0][Datastore.KEY].id});
            } else{
                res.status(404).send({'Error': 'No user with this id is found!'});
            }
        });
    } catch {
        res.status(500).send();
    }
});

// router.get('/user', (req, res) => {
//     try{
//         const cookie = req.cookies['jwt'];
//         const claims = jwt.verify(cookie, 'secret');

//         if (!claims) {
//             return res.status(401).send({
//                 message: 'Unauthenticated!'
//             });
//         }

//         const userKey = datastore.key([USER, cliams._id]);
//         datastore.get(userKey).then((user) => {
//             if (user[0]){
//                 const {password, ...data} = user[0];
//                 res.status(200).send({...data, 'id': user[0][Datastore.KEY].id});
//             } else{
//                 res.status(404).send({'Error': 'No user with this id is found!'});
//             }
//         });
//     } catch {
//         res.status(500).send();
//     }
// });

router.delete('/:id', (req, res) => {
    try {
        const userKey = datastore.key([USER, parseInt(req.params.id)]);
        datastore.delete(userKey).then(() => res.status(204).send());
    } catch {
        res.status(500).send();
    }
});

// router.delete('/user', (req, res) => {
//     try {
//         const cookie = req.cookies['jwt'];
//         const claims = jwt.verify(cookie, 'secret');

//         if (!claims) {
//             return res.status(401).send({
//                 message: 'Unauthenticated!'
//             });
//         }
//         const userKey = datastore.key([USER, cliams._id]);
//         datastore.delete(userKey).then(() => {
//             res.cookie('jwt', '', {maxAge: 0}); // remove cookie when the user is deleted
//             res.status(204).send();
//         });
//         
//     } catch {
//         res.status(500).send();
//     }
// });

module.exports = router;