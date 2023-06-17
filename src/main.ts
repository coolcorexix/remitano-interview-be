import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import * as firebaseAdmin from 'firebase-admin';
import * as firebaseClient from '@firebase/app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./remitano-service-account.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const clientServiceAccount = require('./remitano-client-google-service.json');

async function bootstrap() {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_RTDB_URL,
    });
    firebaseClient.initializeApp(clientServiceAccount);
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
