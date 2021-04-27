import React, { useEffect, useState } from 'react';
import { Lottery } from './model';

export const Gambling = () => {
    const [game, setGame] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetch('http://localhost:3001/scratch/getAll');
          const res = await result.json();
            setGame(res);
        };
     
        fetchData();
      }, []);

  
    return (<>
        <h1>Gambling</h1>
        {game.map(i => <LotteryDetails lottery={i}></LotteryDetails>)}
    </>)
}

type LotteryDetailsProps = {
    lottery: Lottery
}

const LotteryDetails = (props: LotteryDetailsProps) => {

    return (
        <div>
            {props.lottery.result.name}
        </div>
    );
}