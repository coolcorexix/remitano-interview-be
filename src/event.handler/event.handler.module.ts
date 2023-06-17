import { Module } from '@nestjs/common';
import { SocketEventGateway } from 'src/event.handler/socket.event.gateway';

@Module({
    imports: [],
    providers: [SocketEventGateway],
    controllers: [],
    exports: [SocketEventGateway],
})
export class EventHandlerModule {}
