const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const bucketName = 'pet_profile_photos';

async function uploadPhoto(filePath, destFileName) {

  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
}

async function petsPhotos(petID) {
  const prefix = petID + '/';
  
  const options = {
    prefix: prefix,
    delimiter: '/'
  }

  const [files] = await storage.bucket(bucketName).getFiles(options);

  return files;
}
  
module.exports = {
  uploadPhoto,
  petsPhotos
}