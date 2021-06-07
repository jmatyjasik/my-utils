import { HttpModule, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ScratchController } from './scratch.controller';
import { ScratchService } from './scratch.service';

@Module({
    imports: [HttpModule, AuthModule],
    controllers: [ScratchController],
    providers: [ScratchService]
})
export class ScratchLotteryModule {}
