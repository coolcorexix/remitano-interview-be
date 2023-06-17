import { Controller, Get, Post, Put, Request, Query, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VideoSharingService } from 'src/video.sharing/video.sharing.service';

@Controller('videos')
export class VideoSharingController {
    constructor(private readonly videoSharingService: VideoSharingService) {}

    @Post('share/create')
    @UseGuards(AuthGuard('jwt'))
    async share(@Request() request, @Body() videoInfo: { video_id: string }): Promise<any> {
        const { video_id } = videoInfo;
        const userInfo = request.user.userInfo;
        return await this.videoSharingService.createVideoSharing(userInfo, video_id);
    }

    @Get('share/list')
    async listShared(@Request() request, @Query() queries): Promise<any> {
        const { page, page_size: pageSize } = queries;
        return await this.videoSharingService.listSharedVideo({
            page: parseInt(page),
            pageSize: parseInt(pageSize),
        });
    }

    @Get('share/list/byUser')
    @UseGuards(AuthGuard('jwt'))
    async listSharedByUser(@Request() request, @Query() queries): Promise<any> {
        const { page, page_size: pageSize } = queries;
        const userInfo = request.user.userInfo;
        return await this.videoSharingService.listSharedVideoByUser(userInfo, {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
        });
    }
}
