import { DataGrid } from "@material-ui/data-grid";
import { JournalType } from "./journalType";

export type JournalDataProps = {
    journalType: JournalType | null;
}

export const JournalData = (props: JournalDataProps) =>{
    return  (props.journalType && <DataGrid rows={[]}  columns={props.journalType.columns.map(c => ({field: c.key, headerName: c.header}))} pageSize={5} checkboxSelection />);
}