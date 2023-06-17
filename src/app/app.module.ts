import { Module } from '@nestjs/common';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { VideoSharingModule } from 'src/video.sharing/video.sharing.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import appConfig from 'src/config/app.config';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { EventHandlerModule } from 'src/event.handler/event.handler.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, authConfig],
            envFilePath: ['.env'],
        }),
        AuthModule,
        VideoSharingModule,
        YoutubeModule,
        EventHandlerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
