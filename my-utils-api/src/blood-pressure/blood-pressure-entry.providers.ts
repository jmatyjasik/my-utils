import { Connection } from 'mongoose';
import { BloodPressureEntrySchema } from './entities/blood-pressure-entry.schema';

export const providers = [
  {
    provide: 'BLOOD_PRESSURE_ENTRY_MODEL',
    useFactory: (connection: Connection) => connection.model('BloodPressureEntry', BloodPressureEntrySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];