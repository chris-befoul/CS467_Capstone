const {Datastore} = require('@google-cloud/datastore');

// const projectID = 'cs467-sandbox';
const datastore = new Datastore();

function fromDatastore(item) {
    item.id = item[Datastore.KEY].id;
    return item;
}

module.exports = {
    fromDatastore,
    datastore,
    Datastore
}