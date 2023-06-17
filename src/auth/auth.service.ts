import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

@Injectable()
export class AuthService {
    private auth: admin.auth.Auth;

    constructor(private readonly jwtService: JwtService) {
        this.auth = admin.auth();
    }

    async createUser(displayName: string, email: string, password: string): Promise<admin.auth.UserRecord> {
        const user = await this.auth.createUser({
            displayName,
            email,
            password,
        });
        return user;
    }

    async signIn(email: string, password: string): Promise<LoginResponseDto> {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
        } catch (e) {
            switch (e.code) {
                case 'auth/wrong-password': {
                    throw new HttpException(
                        {
                            status: HttpStatus.BAD_REQUEST,
                            error: 'Wrong password',
                        },
                        HttpStatus.BAD_REQUEST,
                    );
                }
                case 'auth/user-not-found': {
                    throw new HttpException(
                        {
                            status: HttpStatus.BAD_REQUEST,
                            error: 'User not found',
                        },
                        HttpStatus.BAD_REQUEST,
                    );
                }
                case 'auth/too-many-requests': {
                    throw new HttpException(
                        {
                            status: HttpStatus.TOO_MANY_REQUESTS,
                            error: 'Too many requests. Please try again later',
                        },
                        HttpStatus.TOO_MANY_REQUESTS,
                    );
                }
                default: {
                    throw new HttpException(
                        {
                            status: HttpStatus.INTERNAL_SERVER_ERROR,
                            error: 'Unknown error, please try again.',
                            code: e.code,
                        },
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
            }
        }
        const user = await this.auth.getUserByEmail(email);
        const token = this.jwtService.sign({
            id: user.uid,
            role: 'user',
        });
        return { token, user };
    }

    async getUser(uid: string): Promise<admin.auth.UserRecord> {
        const user = await this.auth.getUser(uid);
        return user;
    }

    async updateUser(uid: string, updatedUser: admin.auth.UpdateRequest): Promise<admin.auth.UserRecord> {
        const user = await this.auth.updateUser(uid, updatedUser);
        return user;
    }

    async deleteUser(uid: string): Promise<void> {
        await this.auth.deleteUser(uid);
    }
}
