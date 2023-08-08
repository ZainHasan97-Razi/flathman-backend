let jwt = require('jsonwebtoken');
// key will come from env

export const encryptData = async (data: any) => {
  console.log('Data in jwt middleware', data);
  let ecryptedData;
  try {
    console.log('Request abc   ', data);
    ecryptedData = jwt.sign(data.toJSON(), process.env.SECRET_KEY);
    console.log('Encrypted data =>> ', ecryptedData);
    return ecryptedData;
  } catch (err) {
    console.log('Error in encrypt data', err);
  }
};

export const decryptData = async (data: any) => {
  console.log('Data in jwt', data);
  try {
    const bearer = data.encrypt.value.split(' ');
    console.log('Bearer', bearer);
    const token = bearer[0];
    const decryptData = jwt.verify(token, process.env.SECRET_KEY);
    return decryptData;
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};
