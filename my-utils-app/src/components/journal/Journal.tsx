import { Typography, Button, makeStyles, TextField, CardHeader, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { JournalColumnDef, JournalType } from "./journalType";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

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
    panel: {}
  });
  const classes = useStyles();

  const [journals, setJournals] = useState<JournalType[] | []>([]);
  
  const [journalKey, setJournalKey] = useState('');
  const [journalName, setJournalName] = useState('');
  const [journalColums, setJournalColumns] = useState<JournalColumnDef[] | []>([]);
  const [colKey, setColKey] = useState('');
  const [colHeader, setColHeader] = useState('');
  const [refresh, setRefresh] = useState(false);

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

  return (<>
    <h1>Dziennik</h1>

    <Card className={classes.root}>
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
          type="submit">Zapisz</Button></div>

        </form>
      </CardContent>
    </Card>

    <div className={classes.panel} >
      {journals.map( (j: JournalType) =>
        <Card className={classes.tail} key={j.id}>
          <CardHeader title={j.name} subheader={j.createdAt}></CardHeader>
          <CardContent>
         
            <Typography variant="body2" component="p">
              Klucz: {j.key}
            </Typography>
          </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={()=>handleRemoveJournal(j.id)}>
          Usuń
        </Button>
        </CardActions>
        </Card>)}</div>
  </>
  );
}