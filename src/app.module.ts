import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VideoSharingModule } from './video.sharing/video.sharing.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [authConfig],
            envFilePath: ['.env'],
        }),
        AuthModule,
        VideoSharingModule,
        YoutubeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
