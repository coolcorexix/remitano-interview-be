import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VideoSharedPayload } from 'src/utils/types/event/video-shared-payload.type';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class SocketEventGateway {
    @WebSocketServer()
    server: Server;

    sendEvent(eventType: string, payload: any) {
        this.server.emit(eventType, payload);
    }

    @SubscribeMessage('ping')
    ping(): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'pong', data: item })));
    }

    sendVideoSharedEvent(payload: VideoSharedPayload) {
        this.sendEvent('video_shared', payload);
    }
}
