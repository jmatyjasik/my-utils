import { Injectable } from '@nestjs/common';
import { CreateBloodPressureDto } from './dto/create-blood-pressure.dto';
import { UpdateBloodPressureDto } from './dto/update-blood-pressure.dto';

@Injectable()
export class BloodPressureService {
  create(createBloodPressureDto: CreateBloodPressureDto) {
    return 'This action adds a new bloodPressure';
  }

  findAll() {
    return `This action returns all bloodPressure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bloodPressure`;
  }

  update(id: number, updateBloodPressureDto: UpdateBloodPressureDto) {
    return `This action updates a #${id} bloodPressure`;
  }

  remove(id: number) {
    return `This action removes a #${id} bloodPressure`;
  }
}
