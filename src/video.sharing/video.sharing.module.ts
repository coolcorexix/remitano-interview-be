import { Module } from '@nestjs/common';
import { VideoSharingService } from './video.sharing.service';
import { VideoSharingController } from './video.sharing.controller';

@Module({
    imports: [],
    providers: [VideoSharingService],
    controllers: [VideoSharingController],
})
export class VideoSharingModule {}
