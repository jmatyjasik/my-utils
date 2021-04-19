import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BloodPressureModule } from './blood-pressure/blood-pressure.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BloodPressureModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
