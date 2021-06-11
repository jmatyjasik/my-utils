import React, { useState } from "react";
import { BloodPressureDetails } from "./BloodPressureDetails";
import { BloodPressureEntry } from "./model";
import styled from 'styled-components';

export const BloodPressure = () => {

    const Container = styled.div`
        text-align: left;
        width: 300px;
        margin: 100px;
    `;

    const [bpEntries, setBpEntries] = useState<BloodPressureEntry[]>([]);
  
    const [pressure, setPressure] = useState('');
    const [comments, setComments] = useState('');
    const [arm, setArm] = useState('left');
    const [position, setPosition] = useState('sit');
    const [testDate, setTestDate] = useState(Date());
    
  
    const submit = (ev: any) => {
      ev.preventDefault();
      const splitted = pressure.split(' ');
      const stolic = splitted[0].split('/');
      const entry = {
        arm: arm,
        comments: comments,
        diastolic: parseInt(stolic[1]),
        position: position,
        pulse: parseInt(splitted[1]),
        systolic: parseInt(stolic[0])
      };
      
      setBpEntries( arr => [...arr, entry])
    }
  
    return (<>
      <div> Blood pressure 2</div>
  <Container>
      <form onSubmit={submit}>
        <label>Wynik badania:
        <input type='text' value={pressure} onChange={(e) => setPressure(e.target.value)}></input>
        </label>
        <label>Data:
  
  <input type="datetime-local" value={testDate} onChange={(e) => setTestDate(e.target.value)}></input></label>
        <label>
          Ramię:
            <select value={arm} onChange={(e) => setArm(e.target.value)}>
            <option value="left">Lewe</option>
            <option value="right">Prawe</option>
          </select>
        </label>
        <label>
          Pozycja:
            <select value={position} onChange={(e) => setPosition(e.target.value)}>
            <option value="sit">Leząca</option>
            <option value="lie">Siedząca</option>
          </select>
        </label>
        <label>Opis:
        <textarea value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
          <input type="submit" /></label>
      </form>
      </Container>
      <div>Lista</div>
      <div>
        {bpEntries.map((e, index) => (<div><BloodPressureDetails key={index} entry={e}></BloodPressureDetails></div>))}
      </div>
    </>);
  };
  