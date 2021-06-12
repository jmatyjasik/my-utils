import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect } from "react";

export const Journal = ()=> {
  //const [journals, setJournals] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`${process.env.REACT_APP_HOSTNAME}/entries/journal/60c528229783401cf8153809`, {
          method: "GET",
          headers: {
            "X-API-KEY": process.env.REACT_APP_APIKEY!
          }
        } );
        const res = await result.json();
          const json = res.data;

          console.log(json);
          console.log(JSON.parse(`${json}`));
          
          
      };
   
      fetchData();
    }, []);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const d: JournalType = {
    //       columns: [],
    //       key: 'key',
    //       name: 'name'
    //     };
    
    //    const fetchBody = {
    //      data: JSON.stringify(d)
    //    }
       
    //    const json = JSON.stringify(fetchBody);
    //    console.log(json);
       
    //     const result = await fetch(`${process.env.REACT_APP_HOSTNAME}/entries/journal/`, {
    //       method: "POST",
    //       headers: {
    //         "X-API-KEY": process.env.REACT_APP_APIKEY!
    //       },
    //       body:json
    //     } );
    //     const res = await result.json();
    //      console.log(res);
         
          
          
    //   };
   
    //   fetchData();
    // }, []);



  return (<>
      <h1>Dzienik</h1>
      
  </>
    );
}