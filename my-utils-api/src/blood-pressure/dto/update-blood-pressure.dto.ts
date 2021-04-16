import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodPressureDto } from './create-blood-pressure.dto';

export class UpdateBloodPressureDto extends PartialType(CreateBloodPressureDto) {}
