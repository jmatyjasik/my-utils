import { Document } from 'mongoose';

export class Entry extends Document{
    readonly name: string;
    readonly data: string;
}
