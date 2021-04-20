import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntriesService {

  constructor(
    @Inject('ENTRY_MODEL')
    private entryModel: Model<Entry>
  ) {}

  createEntry(name: string, createEntryDto: CreateEntryDto): Promise<Entry> {
      const createdEntry = new this.entryModel({
        name: name,
        data: createEntryDto.data
      });
      return createdEntry.save();
  }

  findAll(): Promise<Entry[]> {
    return this.entryModel.find().exec();
  }

  findByName(name: string): Promise<Entry[]> {
    return this.entryModel.find().where('name').equals(name).exec();
  }

  findEntry(id: string, name: string): Promise<Entry> {
    return this.entryModel.findOne({_id: id, name: name}).exec();
  }

  updateEntry(id: string, name: string, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    return this.entryModel
      .findByIdAndUpdate(id, { $set: updateEntryDto })
      .exec();
  }

  deleteEntry(id: string, name: string): Promise<Entry> {
    return this.entryModel.remove({_id: id, name: name}).exec();
  }

  deleteEntriesByName(name: string): Promise<Entry> {
    return this.entryModel.remove({name: name}).exec();
  }
}
