import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { VideoSharingObject } from 'src/video.sharing/entities/video-sharing-object.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class VideoSharingService {
    private db: admin.database.Database;

    constructor() {
        this.db = admin.database();
    }

    async createVideoSharing(user: string, videoId: string): Promise<any> {
        const ref = this.db.ref('video_sharing').push();
        const sharingObject: VideoSharingObject = new VideoSharingObject();
        sharingObject.id = ref.key;
        sharingObject.shared_by = user;
        sharingObject.video_id = videoId;
        await ref.set(instanceToPlain(sharingObject));
        return sharingObject;
    }

    async listSharedVideo(user: string, queryOptions: { page: number; pageSize: number }): Promise<any> {
        const { page = 0, pageSize = 10 } = queryOptions;
        const startOffset = page * pageSize,
            endOffset = (page + 1) * pageSize;
        const listSharedVideo = [];
        await this.db
            .ref('video_sharing')
            .orderByChild('shared_by')
            .equalTo(user)
            .limitToFirst(1000)
            .once('value', collection => {
                collection.forEach(child => {
                    listSharedVideo.push(child.val());
                });
            });
        return listSharedVideo.slice(startOffset, endOffset);
    }
}
