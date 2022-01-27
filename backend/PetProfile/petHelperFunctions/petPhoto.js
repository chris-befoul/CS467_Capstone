const {Storage} = require('@google-cloud/storage');
const storage = new Storage({projectId: 'cs467-sandbox'});

const bucketName = 'pet_profile_photo';

async function uploadPhoto(filePath, destFileName) {

  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}
  
module.exports = {
  uploadPhoto
}