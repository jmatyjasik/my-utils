import React, { useEffect, useState } from 'react';
import { Lottery } from './model';
import './Gambling.css';

export const Gambling = () => {
    const [game, setGame] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await fetch(`http://${process.env.REACT_APP_HOSTNAME}/scratch/getAll`, {
            method: "GET",
            headers: {
              "X-API-KEY": process.env.REACT_APP_APIKEY!
            }
          } );
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
    const [count, setCount] = useState(1);

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const performGames = () => {
        let costs = 0
        let winPrice = 0;
        for (let game = 1; game <= count; game++) {
            costs = costs + props.lottery.ticketPrice;
            
            const random = getRandomInt(1, props.lottery.circulation);
            
            let prizeCount = 0
            for (let index = 0; index < props.lottery.prizes.length; index++) {
                const element = props.lottery.prizes[index];
                if(random>prizeCount && random<(prizeCount + element.quantity)){
                    winPrice = winPrice + element.prize
                }
                prizeCount = prizeCount + element.quantity;
            }
        }

        alert(`${count} gier - koszt: ${costs.toLocaleString()} zł - wygrana: ${winPrice.toLocaleString()} zł - z wartości oczekiwanej: ${(count * props.lottery.expextedValue).toLocaleString(undefined, {maximumFractionDigits:2})} zł`)
    }

    return (
        <>
            
            <div className='left'>
            <img src={`https://www.lotto.pl/${props.lottery.imageUrl}`}></img>
            </div>

            <div className='right'>
            <h1>{props.lottery.name}</h1>
            <div>Cena {props.lottery.ticketPrice} zł </div>
            <div>{props.lottery.circulation.toLocaleString()} zdrapek</div>
            <div>Wygranch losów: {props.lottery.winingLeftSum.toLocaleString()} / {props.lottery.winningSum.toLocaleString()}</div>
            <div>Wartość oczekiwana {props.lottery.expextedValue.toFixed(2)} zł</div>
            <div></div>
            <div>Pozostało ~{props.lottery.circulationAdj.toLocaleString(undefined, {maximumFractionDigits:0})} zdrapek</div>
            <div>Aktualna wartość oczekiwana ~{props.lottery.adjustedExpectedValue.toFixed(2)} zł</div>
            <div>Rentowność {props.lottery.profitabilityPercent.toFixed(2) } %</div>
            <div>Aktualna rentowność {props.lottery.profitabilityAdjustedPercent.toFixed(2) } %</div>

            <ul>
                {props.lottery.prizes.map(i=>{
                    return (
                        <li>{i.prize.toLocaleString()} zł - {i.quantityLeft.toLocaleString()} / {i.quantity.toLocaleString()} ({i.probabilityAdjustedPercent.toFixed(2)}% / {i.probabilityPercent.toFixed(2)}%)</li>
                    )
                })}
            </ul>

            <div>
                
                <button onClick={()=>performGames()}>Sumulacja</button>
                <input type="number" value={count} onChange={(e)=>setCount(parseInt(e.target.value))} ></input>
                <span>zdrapek</span>
            </div>
            </div>
        </>


    );
}