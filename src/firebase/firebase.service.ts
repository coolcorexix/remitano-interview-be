import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { configure } from './firebase.config';

@Injectable()
export class FirebaseService {
  private db: admin.database.Database;

  constructor() {
    configure();
    this.db = admin.database();
  }

  async getData(path: string): Promise<any> {
    const snapshot = await this.db.ref(path).once('value');
    return snapshot.val();
  }

  async say() {
    console.log('said');
  }
}
