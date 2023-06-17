import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { VideoSharingObject } from 'src/video.sharing/entities/video-sharing-object.entity';
import { instanceToPlain } from 'class-transformer';
import { YoutubeService } from 'src/youtube/youtube.service';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;
import { SocketEventGateway } from 'src/event.handler/socket.event.gateway';

@Injectable()
export class VideoSharingService {
    private db: admin.database.Database;

    constructor(
        private readonly youtubeService: YoutubeService,
        private readonly eventGateway: SocketEventGateway,
    ) {
        this.db = admin.database();
    }

    async createVideoSharing(user: UserRecord, videoId: string): Promise<VideoSharingObject> {
        const ref = this.db.ref('video_sharing').push();

        // Retrieve video information
        const videoInfo = await this.youtubeService.getYoutubeVideoInfo(videoId);
        if (!videoInfo) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: `Video ${videoId} does not exists. Please try another video`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        // Create sharing object and save to database
        const sharingObject: VideoSharingObject = new VideoSharingObject();
        sharingObject.id = ref.key;
        sharingObject.shared_by = {
            id: user.uid,
            display_name: user.displayName,
            email: user.email,
        };
        sharingObject.video = videoInfo;
        await ref.set(instanceToPlain(sharingObject));

        // Sending video_shared event on socket gateway
        this.eventGateway.sendVideoSharedEvent({
            shareId: sharingObject.id,
            videoTitle: videoInfo.snippet.title,
            sharedBy: user.displayName,
        });
        return sharingObject;
    }

    async listSharedVideo(queryOptions: { page: number; pageSize: number }): Promise<VideoSharingObject[]> {
        // Pagination
        const { page = 0, pageSize = 10 } = queryOptions;
        const startOffset = page * pageSize,
            endOffset = (page + 1) * pageSize;

        // Firebase query
        const listSharedVideo = [];
        await this.db
            .ref('video_sharing')
            .orderByChild('shared_at')
            .limitToLast(10000)
            .once('value', collection => {
                collection.forEach(child => {
                    listSharedVideo.push(child.val());
                });
            });

        // Last save first show
        listSharedVideo.reverse();
        return listSharedVideo.slice(startOffset, endOffset);
    }

    async listSharedVideoByUser(
        user: UserRecord,
        queryOptions: { page: number; pageSize: number },
    ): Promise<VideoSharingObject[]> {
        // Pagination
        const { page = 0, pageSize = 10 } = queryOptions;
        const startOffset = page * pageSize,
            endOffset = (page + 1) * pageSize;

        // Firebase query
        const listSharedVideo = [];
        await this.db
            .ref('video_sharing')
            .orderByChild('shared_by/id')
            .equalTo(user.uid)
            .limitToLast(10000)
            .once('value', collection => {
                collection.forEach(child => {
                    listSharedVideo.push(child.val());
                });
            });

        // Last save first show
        listSharedVideo.reverse();
        return listSharedVideo.slice(startOffset, endOffset);
    }
}
