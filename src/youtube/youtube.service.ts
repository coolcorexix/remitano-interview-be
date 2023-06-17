import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeService {
    private youtubeClient: youtube_v3.Youtube;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('app.googleapis.api_key');
        this.youtubeClient = google.youtube({
            version: 'v3',
            auth: apiKey,
        });
    }

    async getYoutubeVideoInfo(videoId: string): Promise<youtube_v3.Schema$Video> {
        const response = await this.youtubeClient.videos.list({
            part: ['snippet', 'statistics'],
            id: [videoId],
        });
        const video = response.data.items[0];
        return video;
    }
}
