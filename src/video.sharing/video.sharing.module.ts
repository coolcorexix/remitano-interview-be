import { Module } from '@nestjs/common';
import { VideoSharingService } from './video.sharing.service';
import { VideoSharingController } from './video.sharing.controller';
import { YoutubeModule } from 'src/youtube/youtube.module';

@Module({
    imports: [YoutubeModule],
    providers: [VideoSharingService],
    controllers: [VideoSharingController],
})
export class VideoSharingModule {}
