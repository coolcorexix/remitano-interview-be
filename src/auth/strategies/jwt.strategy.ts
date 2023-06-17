import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from 'src/utils/types/auth/jwt-payload.type';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: configService.get('auth.secret'),
        });
    }

    public async validate(payload: JwtPayloadType): Promise<JwtPayloadType | never> {
        if (!payload.id) {
            throw new UnauthorizedException();
        }
        try {
            const userInfo = await this.authService.getUser(payload.id);
            return { ...payload, userInfo };
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'User not found',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
