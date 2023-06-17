import { Test, TestingModule } from '@nestjs/testing';
import { VideoSharingController } from './video.sharing.controller';

describe('VideoSharingController', () => {
    let controller: VideoSharingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VideoSharingController],
        }).compile();

        controller = module.get<VideoSharingController>(VideoSharingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
