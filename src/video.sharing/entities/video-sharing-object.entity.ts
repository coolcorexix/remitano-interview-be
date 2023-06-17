import { youtube_v3 } from 'googleapis';

class UserBasic {
    id: string;
    display_name: string;
    email: string;
}

export class VideoSharingObject {
    id: string;
    shared_by: UserBasic;
    shared_at: number;
    video: youtube_v3.Schema$Video;

    constructor() {
        this.shared_at = new Date().getTime();
    }
}
