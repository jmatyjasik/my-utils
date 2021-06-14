export type JournalType = {
    id: string,
    createdAt: string,
    updatedAt: string,
    key: string,
    name: string;
    columns: JournalColumnDef[]
}

export type JournalColumnDef = {
    code: string;
    header: string;
    type: 'string'
}