import { Module } from '@nestjs/common';
import { VideoSharingService } from './video.sharing.service';
import { VideoSharingController } from './video.sharing.controller';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { EventHandlerModule } from 'src/event.handler/event.handler.module';

@Module({
    imports: [YoutubeModule, EventHandlerModule],
    providers: [VideoSharingService],
    controllers: [VideoSharingController],
})
export class VideoSharingModule {}
