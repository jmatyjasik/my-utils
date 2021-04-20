import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post(':name')
  create(@Param('name') name: string, @Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.createEntry(name, createEntryDto);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':name')
  findAllByName(@Param('name') name: string) {
    return this.entriesService.findByName(name);
  }

  @Get(':name/:id')
  findOne(@Param('name') name: string, @Param('id') id: string) {
    return this.entriesService.findEntry(id, name);
  }

  @Put(':name/:id')
  updateEntry(
    @Param('name') name: string,
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.updateEntry(id, name, updateEntryDto);
  }


  @Delete(':name/:id')
  removeEntry(@Param('name') name: string, @Param('id') id: string) {
    return this.entriesService.deleteEntry(id, name);
  }

  @Delete(':name')
  removeEntryByName(@Param('name') name: string) {
    return this.entriesService.deleteEntriesByName(name);
  }
}
