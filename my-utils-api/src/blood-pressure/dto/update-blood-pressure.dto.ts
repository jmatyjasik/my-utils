import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodPressureEntryDto } from './create-blood-pressure.dto';

export class UpdateBloodPressureDto extends PartialType(CreateBloodPressureEntryDto) {}
