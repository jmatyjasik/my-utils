import React, { useEffect, useState } from 'react';

export const Gambling = () => {
    const [game, setGame] = useState({});

    useEffect(() => {
        setGame(fetchGamneJSON())
    }, [])

    async function fetchGamneJSON() {
        try {
            const response = await fetch('https://www.lotto.pl/api/lotteries/zdrapki/982/page/74');
            const game = await response.json();
            return game; 
        } catch (error) {
            console.log(error)
        }
        
      }

    return (<><h1>Gambling</h1>
        {JSON.stringify(game)}
    </>)
}