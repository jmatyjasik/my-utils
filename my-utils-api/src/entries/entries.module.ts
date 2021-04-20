import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { providers } from './entries.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EntriesController],
  providers: [EntriesService, ...providers]
})
export class EntriesModule {}
