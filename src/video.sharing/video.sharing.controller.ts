import { Controller, Get, Post, Put, Query, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VideoSharingService } from 'src/video.sharing/video.sharing.service';
@Controller('videos')
export class VideoSharingController {
    constructor(private readonly videoSharingService: VideoSharingService) {}

    @Post('share/create')
    @UseGuards(AuthGuard('jwt'))
    async share(@Body() videoInfo: { video_id: string }): Promise<any> {
        const { video_id } = videoInfo;
        return await this.videoSharingService.createVideoSharing('test.user.02', video_id);
    }

    @Get('share/list')
    @UseGuards(AuthGuard('jwt'))
    async listShared(@Query() queries): Promise<any> {
        const { page, page_size: pageSize } = queries;
        return await this.videoSharingService.listSharedVideo('test.user.02', {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
        });
    }
}
