import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
@Controller('videos')
export class VideoSharingController {
    constructor(private readonly db: FirebaseService) {}
    @Post('share')
    async createUser(@Body() user: any): Promise<any> {
        await this.db.say();
        // const ref = this.db.ref('users').push();
        // const newUser = {
        //   id: ref.key,
        //   ...user,
        // };
        // await ref.set(newUser);
        // return newUser;
    }
}
