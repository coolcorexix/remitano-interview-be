import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

export type JwtPayloadType = {
    id: string;
    role: string;
    iat: number;
    exp: number;
    userInfo: UserRecord;
};
