import { HttpModule, Module } from '@nestjs/common';
import { ScratchController } from './scratch.controller';
import { ScratchService } from './scratch.service';

@Module({
    imports: [HttpModule],
    controllers: [ScratchController],
    providers: [ScratchService]
})
export class ScratchLotteryModule {}
