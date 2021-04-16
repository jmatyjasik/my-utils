import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodPressureService } from './blood-pressure.service';
import { CreateBloodPressureDto } from './dto/create-blood-pressure.dto';
import { UpdateBloodPressureDto } from './dto/update-blood-pressure.dto';

@Controller('blood-pressure')
export class BloodPressureController {
  constructor(private readonly bloodPressureService: BloodPressureService) {}

  @Post()
  create(@Body() createBloodPressureDto: CreateBloodPressureDto) {
    return this.bloodPressureService.create(createBloodPressureDto);
  }

  @Get()
  findAll() {
    return this.bloodPressureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodPressureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodPressureDto: UpdateBloodPressureDto) {
    return this.bloodPressureService.update(+id, updateBloodPressureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodPressureService.remove(+id);
  }
}
