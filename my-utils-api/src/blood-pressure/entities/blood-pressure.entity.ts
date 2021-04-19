import { Document } from 'mongoose';

export interface BloodPressureEntry extends Document {
    readonly systolic: number,
    readonly diastolic: number,
    readonly pulse: number,
    readonly testDate: Date,
    readonly arm: string,
    readonly position: string,
    readonly comments: string
}
