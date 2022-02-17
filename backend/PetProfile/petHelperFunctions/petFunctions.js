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

async function edit_pet(petID, name, type, breed, availability, sex, age, weight, disposition, description, date, shelter_id, image) {
    const key = helper.datastore.key([PET, parseInt(petID, 10)]);
    var file_name = '';
    if (image === undefined){
        const entity = await helper.datastore.get(key);
        file_name = entity[0].image;
    } else {
        file_name = image;
    }
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
        'shelter_id': shelter_id,
        'image': file_name
    };
    return helper.datastore.save({ 'key': key, 'data': updated_pet}).then(() => { 
        var updated_entry = updated_pet; updated_entry['id'] = key.id;
        return updated_entry });
}

async function post_pet(name, type, breed, availability, sex, age, weight, disposition, description, shelter_id, image) {
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
        'shelter_id': shelter_id,
        'image': image 
    };
    return helper.datastore.save({ 'key': key, 'data': new_pet}).then(() => { 
        var new_entry = new_pet; new_entry['id'] = key.id;
        return new_entry });
}

async function deleteImgFromPet(pet_id, filename){
    const key = helper.datastore.key([PET, parseInt(pet_id)]);
    const result = await helper.datastore.get(key);
    if (result[0].image == filename.split('/')[1]){
        var files = await photoFunction.petsPhotos(pet_id);
        files = files.filter((file) => file.name !== filename);
        var new_file = '';
        if(files.length > 0){
            new_file = files[0].name.split('/')[1];
        }
        const updated_pet = { 
            'name': result[0].name, 
            'type': result[0].type, 
            'breed': result[0].breed, 
            'availability': result[0].availability, 
            'sex': result[0].sex, 
            'age': result[0].age, 
            'weight': result[0].weight, 
            'disposition': result[0].disposition, 
            'description': result[0].description, 
            'date_created': result[0].date_created, 
            'shelter_id': result[0].shelter_id,
            'image': new_file
        };
        await helper.datastore.save({ 'key': key, 'data': updated_pet});
    }
}

module.exports = {
    post_pet,
    get_pet,
    edit_pet,
    deleteImgFromPet
}