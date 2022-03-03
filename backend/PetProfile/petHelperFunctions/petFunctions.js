const helper = require('../API/datastoreHelper');
const PET = "Pet";
const photoFunction = require('../petHelperFunctions/petPhoto');


async function get_pet(petID) {
    const key = helper.datastore.key([PET, parseInt(petID, 10)]);
    return helper.datastore.get(key).then((entity) => {
        if (entity[0] === undefined || entity[0] === null) {
            // No entity found. Don't try to add the petID attribute
            return entity;
        }
        else {
            return entity.map(helper.fromDatastore);
        }
    })
}

async function edit_pet(petID, name, type, breed, availability, sex, age, weight, disposition, description, date, shelter_id) {
    const key = helper.datastore.key([PET, parseInt(petID, 10)]);
    const updated_pet = { 
        'name': name, 
        'type': type, 
        'breed': breed, 
        'availability': availability, 
        'sex': sex, 
        'age': age, 
        'weight': weight, 
        'disposition': disposition, 
        'description': description, 
        'date_created': date, 
        'shelter_id': shelter_id
    };
    return helper.datastore.save({ 'key': key, 'data': updated_pet}).then(() => { 
        var updated_entry = updated_pet; updated_entry['id'] = key.id;
        return updated_entry });
}

async function post_pet(name, type, breed, availability, sex, age, weight, disposition, description, shelter_id) {
    var key = helper.datastore.key(PET);
    const new_pet = { 
        'name': name, 
        'type': type, 
        'breed': breed, 
        'availability': availability, 
        'sex': sex, 
        'age': age, 
        'weight': weight, 
        'disposition': disposition, 
        'description': description, 
        'date_created': new Date(), 
        'shelter_id': shelter_id
    };
    return helper.datastore.save({ 'key': key, 'data': new_pet}).then(() => { 
        var new_entry = new_pet; new_entry['id'] = key.id;
        return new_entry });
}

async function get_all_pets(shelter_id) {
    const q = helper.datastore.createQuery(PET).filter('shelter_id', '=', shelter_id);
    return helper.datastore.runQuery(q).then((entities) => {
        return entities[0].map(helper.fromDatastore);
    });
}

async function get_featured_pets() {
    const q = helper.datastore.createQuery(PET).filter('availability', '=', 'Available');
    return helper.datastore.runQuery(q).then((entities) => {
        return entities[0].sort((a, b) => b.date_created - a.date_created).slice(0,4).map(helper.fromDatastore);
    });
}

async function delete_pet(pet_id){
    const key = helper.datastore.key([PET, parseInt(pet_id)]);
    await helper.datastore.delete(key);
}

module.exports = {
    post_pet,
    get_pet,
    edit_pet,
    get_all_pets,
    delete_pet,
    get_featured_pets
}