import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';

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
