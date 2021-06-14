export type JournalType = {
    id: string,
    createdAt: string,
    updatedAt: string,
    key: string,
    name: string;
    columns: JournalColumnDef[]
}

export class JournalColumnDef {
    constructor(
        public readonly key: string,
        public readonly header: string,
        public readonly type: 'string' = 'string'
    ) {}
}