import { Typography, Button, makeStyles, TextField, CardHeader, List, ListItem, ListItemText, ListItemIcon, Select, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { JournalColumnDef, JournalType } from "./journalType";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import { DataGrid } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core';

export const Journal = () => {

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginBottom: 12,
    },
    tail: {
      maxWidth: 400,
      minWidth: 400,
      marginBottom: 12,
      marginRight: 12,
      float: 'left'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
      marginTop: 15
    },
    field: {
      marginRight: 20
    },
    panel: { width: '100%' }
  });
  const classes = useStyles();

  const [journals, setJournals] = useState<JournalType[] | []>([]);
  
  const [journalKey, setJournalKey] = useState('');
  const [journalName, setJournalName] = useState('');
  const [journalColums, setJournalColumns] = useState<JournalColumnDef[] | []>([]);
  const [colKey, setColKey] = useState('');
  const [colHeader, setColHeader] = useState('');
  const [refresh, setRefresh] = useState(false);
const [addJournalMode, setAddJournalMode] = useState(false);
const [showAllJournal, setShowAllJournal] = useState(false)


  const [selectedJournal, setSelectedJournal] = useState<JournalType|undefined>(undefined);

  const convertToJournal = (responseJson: any): JournalType => {
    const journalData = JSON.parse(responseJson.data) as JournalType;
    return {
      id: responseJson._id,
      createdAt: responseJson.createdAt,
      updatedAt: responseJson.updatedAt,
      key: journalData.key,
      name: journalData.name,
      columns: journalData.columns
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${process.env.REACT_APP_HOSTNAME}/entries/journal/`, {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.REACT_APP_APIKEY!
        }
      });
      const res = await result.json();
      const journals = res.map((i: any) => (convertToJournal(i)));

      setJournals(journals);
    };

    fetchData();
  }, [refresh]);

  function handleJournalSubmit(event: any) {
    event.preventDefault();
    const data = {
      key: journalKey,
      name: journalName,
      columns: journalColums
    } ;
    const fetchBody = {
      data: JSON.stringify(data)
    }

    const json = JSON.stringify(fetchBody);


    fetch(`${process.env.REACT_APP_HOSTNAME}/entries/journal/`, {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.REACT_APP_APIKEY!,
        'Content-Type': 'application/json'
      },
      body: json
    })
    .then(response => response.json())
    .then(data => {
        const journal = convertToJournal(data);
        const newJ = [...journals, journal];
        setJournals(newJ);
        setJournalKey('');
        setJournalName('');
        setJournalColumns([]);
        setAddJournalMode(false)
    })
  }

  function handleRemoveJournal(id: string) {
    console.log(id);
    fetch(`${process.env.REACT_APP_HOSTNAME}/entries/journal/${id}`, {
      method: "DELETE",
      headers: {
        "X-API-KEY": process.env.REACT_APP_APIKEY!,
      }
    })
    .then(response => setRefresh(!refresh));
  }

  const renderDataGrid = () => {
      if(!selectedJournal){
        return (<div>Empty</div>);
      }

      const cols = selectedJournal.columns.map(c => ({field: c.key, headerName: c.header, width:130}));

      return  (<DataGrid rows={[]}  columns={cols} pageSize={5} checkboxSelection />);
  }

  return (<>
   <Grid container spacing={3}>
        <Grid item xs={4}>
          <h1>Dziennik - {selectedJournal?.name ?? '<wybierz>'}</h1>
        </Grid>
        <Grid item xs={8}>
        <Select
          native
          value={selectedJournal?.id}
          onChange={(ev)=> setSelectedJournal(journals.find(i=>i.id === ev.target.value))}
          label="Dziennik"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {journals.map(j =>  <option value={j.id}>{j.name}</option>)}
       
        </Select>

        <Button onClick={()=>setAddJournalMode(true)}>Dodaj dziennik</Button>
        <Button onClick={()=>setShowAllJournal(true)}>Pokaż wszystkir</Button>

        </Grid>

        <Grid item xs={12}>
        {addJournalMode && <Card className={classes.root}>
      <CardContent>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleJournalSubmit}>
          <div>
            <TextField id="standard-required" className={classes.field} label="Klucz" value={journalKey} onChange={e => setJournalKey(e.target.value)} />
            <TextField id="standard-disabled" className={classes.field} label="Nazwa" value={journalName} onChange={e => setJournalName(e.target.value)} />
          </div>
          <div>
            <List>
              {journalColums.map((colDef: JournalColumnDef) => <ListItem> 
                <ListItemIcon><ViewColumnIcon/></ListItemIcon>
                <ListItemText
                    primary={colDef.header}
                    secondary={colDef.key}
                  /></ListItem>)}
            </List>
          </div>
          <div>
            <TextField id="standard-required" className={classes.field} label="Nazwa kolumny" value={colHeader} onChange={e => setColHeader(e.target.value)} />
            <TextField id="standard-disabled" className={classes.field} label="Klucz" value={colKey} onChange={e => setColKey(e.target.value)} />
            <Button variant="outlined"
              color="secondary"
              onClick={()=>{
                const newCol = new JournalColumnDef(colKey, colHeader);
                setJournalColumns([...journalColums, newCol]);
                setColKey('');
                setColHeader('');
              }} > 
              Dodaj
            </Button>
          </div>

          <div><Button 
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          type="submit">Zapisz</Button>
          <Button onClick={()=>setAddJournalMode(false)}>Anuluj</Button></div>

        </form>
      </CardContent>
    </Card>}
        </Grid>

        {showAllJournal && <Grid item xs={12}>
        {journals.map( (j: JournalType) =>
        <Card className={classes.tail} key={j.id}>
          <CardHeader title={j.name} subheader={j.createdAt}></CardHeader>
          <CardContent>
         
            <Typography variant="body2" component="p">
              Kolumny: ({j.columns.map(i=>i.header).join(', ')})
            </Typography>
          </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={()=>handleRemoveJournal(j.id)}>
          Usuń
        </Button>
        <Button size="small" color="primary" onClick={()=>{setSelectedJournal(j); setShowAllJournal(false)}}>
          Pokaż
        </Button>
        </CardActions>
        </Card>)}
        </Grid>}

        <Grid item xs={12}>{renderDataGrid()}</Grid>
    </Grid>
    
  
    




          
       
  </>
  );
}