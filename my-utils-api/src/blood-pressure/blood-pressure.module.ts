import { Module } from '@nestjs/common';
import { BloodPressureService } from './blood-pressure.service';
import { BloodPressureController } from './blood-pressure.controller';

@Module({
  controllers: [BloodPressureController],
  providers: [BloodPressureService]
})
export class BloodPressureModule {}
