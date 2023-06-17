import { Module } from '@nestjs/common';
import { VideoSharingService } from './video.sharing.service';
import { VideoSharingController } from './video.sharing.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [VideoSharingService],
  controllers: [VideoSharingController],
})
export class VideoSharingModule {}
