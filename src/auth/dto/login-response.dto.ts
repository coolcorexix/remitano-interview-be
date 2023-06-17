import * as admin from 'firebase-admin';

export class LoginResponseDto {
    user: admin.auth.UserRecord;
    token: string;
}
