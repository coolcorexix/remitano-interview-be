import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./remitano-service-account.json');

export const configure = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://remitano-520fe-default-rtdb.asia-southeast1.firebasedatabase.app/',
  });
};
