import { Connection } from 'mongoose';
import { EntrySchema } from './entities/entry.schema';

export const providers = [
  {
    provide: 'ENTRY_MODEL',
    useFactory: (connection: Connection) => connection.model('Entry', EntrySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];