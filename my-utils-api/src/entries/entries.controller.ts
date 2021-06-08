import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post(':name')
  @UseGuards(AuthGuard('api-key'))
  create(@Param('name') name: string, @Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.createEntry(name, createEntryDto);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':name')
  @UseGuards(AuthGuard('api-key'))
  findAllByName(@Param('name') name: string) {
    return this.entriesService.findByName(name);
  }

  @Get(':name/:id')
  @UseGuards(AuthGuard('api-key'))
  findOne(@Param('name') name: string, @Param('id') id: string) {
    return this.entriesService.findEntry(id, name);
  }

  @Put(':name/:id')
  @UseGuards(AuthGuard('api-key'))
  updateEntry(
    @Param('name') name: string,
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.updateEntry(id, name, updateEntryDto);
  }


  @Delete(':name/:id')
  @UseGuards(AuthGuard('api-key'))
  removeEntry(@Param('name') name: string, @Param('id') id: string) {
    return this.entriesService.deleteEntry(id, name);
  }

  @Delete(':name')
  @UseGuards(AuthGuard('api-key'))
  removeEntryByName(@Param('name') name: string) {
    return this.entriesService.deleteEntriesByName(name);
  }
}
