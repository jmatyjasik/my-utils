import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EntriesModule } from './entries/entries.module';
import { ScratchLotteryModule } from './scratch-lottery/scratch-lottery.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HealthcheckModule } from './heathcheck/healthcheck.module';

@Module({
  imports: [ConfigModule.forRoot(), ScratchLotteryModule, DatabaseModule, EntriesModule, AuthModule, HealthcheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
