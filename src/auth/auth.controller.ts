import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() credentials: { displayName: string; email: string; password: string }) {
        const { displayName, email, password } = credentials;
        return await this.authService.createUser(displayName, email, password);
    }

    @Post('signin')
    async signIn(@Body() credentials: { email: string; password: string }) {
        const { email, password } = credentials;
        return await this.authService.signIn(email, password);
    }
}
