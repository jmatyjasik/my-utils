import { Module } from '@nestjs/common';
import { BloodPressureService } from './blood-pressure.service';
import { BloodPressureController } from './blood-pressure.controller';
import { DatabaseModule } from 'src/database/database.module';
import { providers } from './blood-pressure-entry.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BloodPressureController],
  providers: [BloodPressureService, ...providers]
})
export class BloodPressureModule {}
