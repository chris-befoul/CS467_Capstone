const helper = require('../API/datastoreHelper');
const PET = "Pet";
const photoFunction = require('../petHelperFunctions/petPhoto');


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

module.exports = {
    post_pet
}