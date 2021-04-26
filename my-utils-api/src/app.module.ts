import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EntriesModule } from './entries/entries.module';
import { ScratchLotteryModule } from './scratch-lottery/scratch-lottery.module';

@Module({
  imports: [DatabaseModule, EntriesModule, ScratchLotteryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
