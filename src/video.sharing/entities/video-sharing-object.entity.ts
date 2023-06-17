export class VideoSharingObject {
    id: string;
    shared_by: string;
    video_id: string;
    shared_at: number;

    constructor() {
        this.shared_at = new Date().getTime();
    }
}
