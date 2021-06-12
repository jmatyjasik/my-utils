export type JournalType = {
    key: string,
    name: string;
    columns: JournalColumnDef[]
}

export type JournalColumnDef = {
    code: string;
    header: string;
    type: 'string'
}