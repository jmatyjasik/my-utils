import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './database/database.module';
// import { EntriesModule } from './entries/entries.module';
import { ScratchLotteryModule } from './scratch-lottery/scratch-lottery.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ScratchLotteryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
