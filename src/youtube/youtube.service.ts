import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';

@Injectable()
export class YoutubeService {
    private youtubeClient: youtube_v3.Youtube;

    constructor() {
        const apiKey = 'AIzaSyASClAg0trM2OmMaYeuCsvQxGU6lroVM50'; // Replace with your YouTube Data API key
        this.youtubeClient = google.youtube({
            version: 'v3',
            auth: apiKey,
        });
    }

    async getVideoInfo(videoId: string): Promise<youtube_v3.Schema$Video> {
        const response = await this.youtubeClient.videos.list({
            part: ['snippet', 'statistics'],
            id: [videoId],
        });
        const video = response.data.items[0];
        return video;
    }
}
