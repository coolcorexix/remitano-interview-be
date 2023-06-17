import { Test, TestingModule } from '@nestjs/testing';
import { VideoSharingService } from './video.sharing.service';

describe('VideoSharingService', () => {
  let service: VideoSharingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoSharingService],
    }).compile();

    service = module.get<VideoSharingService>(VideoSharingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
