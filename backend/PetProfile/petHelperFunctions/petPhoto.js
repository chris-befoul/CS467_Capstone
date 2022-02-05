const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const bucketName = 'pet_profile_photos';

async function uploadPhoto(filePath, destFileName) {

  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
}
  
module.exports = {
  uploadPhoto
}