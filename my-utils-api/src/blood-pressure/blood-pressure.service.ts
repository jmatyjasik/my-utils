import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBloodPressureEntryDto } from './dto/create-blood-pressure.dto';
import { UpdateBloodPressureDto } from './dto/update-blood-pressure.dto';
import { BloodPressureEntry } from './entities/blood-pressure.entity';

@Injectable()
export class BloodPressureService {

  constructor(
    @Inject('BLOOD_PRESSURE_ENTRY_MODEL')
    private bloodPressureEntryModel: Model<BloodPressureEntry>
  ) {}

  createEntry(createBloodPressureDto: CreateBloodPressureEntryDto): Promise<BloodPressureEntry> {
      const createdEntry = new this.bloodPressureEntryModel(createBloodPressureDto);
      return createdEntry.save();
  }

  findAll(): Promise<BloodPressureEntry[]> {
    return this.bloodPressureEntryModel.find().exec();
  }

  findOne(id: string): Promise<BloodPressureEntry> {
    return this.bloodPressureEntryModel.findById(id).exec();
  }

  delete(id: string): Promise<BloodPressureEntry> {
    return this.bloodPressureEntryModel.findByIdAndDelete(id).exec();
  }
}
