import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BloodPressureModule } from './blood-pressure/blood-pressure.module';

@Module({
  imports: [BloodPressureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
