import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { VideoSharingModule } from './video.sharing/video.sharing.module';
import { VideoSharingController } from 'src/video.sharing/video.sharing.controller';

@Module({
  imports: [AuthModule, FirebaseModule, VideoSharingModule],
  controllers: [AppController, VideoSharingController],
  providers: [AppService],
})
export class AppModule {}
