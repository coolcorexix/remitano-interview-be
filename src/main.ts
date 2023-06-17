import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./remitano-service-account.json');

async function bootstrap() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://remitano-520fe-default-rtdb.asia-southeast1.firebasedatabase.app/',
    });
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
