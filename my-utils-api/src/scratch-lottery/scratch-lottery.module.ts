import { HttpModule, Module } from '@nestjs/common';
import { ScratchController } from './scratch.controller';

@Module({
    imports: [HttpModule],
    controllers: [ScratchController]
})
export class ScratchLotteryModule {}
