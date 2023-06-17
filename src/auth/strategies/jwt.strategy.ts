import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from 'src/utils/types/auth/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: configService.get('auth.secret'),
        });
    }

    public validate(payload: JwtPayloadType): JwtPayloadType | never {
        if (!payload.id) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
