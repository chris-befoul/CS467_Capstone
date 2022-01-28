// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore();

const taskKey = datastore.key('User');
const data = {
  first_name: 'Bobby',
  last_name: 'Smith',
  email: 'bs@gmail.com',
  password: 'qwerty',
  phone: 6171234567,
  city: 'Boston',
  state: 'MA',
  zip_code: 02215,
  email_preference: false,
};

const entity = {
  key: taskKey,
  data: data,
};

datastore.insert(entity).then(() => {
  // Task inserted successfully.
});