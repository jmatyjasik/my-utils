import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BloodPressureService } from './blood-pressure.service';
import { CreateBloodPressureEntryDto } from './dto/create-blood-pressure.dto';

@Controller('blood-pressure')
export class BloodPressureController {
  constructor(private readonly bloodPressureService: BloodPressureService) {}

  @Post()
  create(@Body() createBloodPressureDto: CreateBloodPressureEntryDto) {
    return this.bloodPressureService.createEntry(createBloodPressureDto);
  }

  @Get()
  findAll() {
    return this.bloodPressureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodPressureService.findOne(id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodPressureService.delete(id);
  }
}
