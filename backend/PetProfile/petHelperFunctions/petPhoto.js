const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const bucket = storage.bucket('pet_profile_photo');

const bucketName = 'pet_profile_photo';

async function uploadPhoto(file, fileName) {

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
  next(err);
  });

  blobStream.on('finish', () => {
      return;
    });
  
    blobStream.end(file.buffer);
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

async function deletePhoto(fileName) {
  await storage.bucket(bucketName).file(fileName).delete();
}

async function deletePhotosOfPet(petID){
  await storage.bucket(bucketName).deleteFiles({prefix: petID + '/'});
}
  
module.exports = {
  uploadPhoto,
  petsPhotos,
  deletePhoto,
  deletePhotosOfPet
}