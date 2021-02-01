import React, { useState, useEffect } from "react";
import axios from "axios";
import Weight from "./Weight";
// AUTH0
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from '@auth0/auth0-react';
// CHART
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function App(props) {

  // DUMMY DATA TO PREVENT CRASHES
  const dummyData = [
    {weight: "", date: ""}
  ]

  // STATE FOR WEIGHT-DATA
  const [weightData, setWeightData] = useState(dummyData);
  console.log(weightData);
  // DUMMY Data aus dem ARRAY rauskriegen
  if(weightData.length === 2 && weightData[0].weight === "") {
    const currentStateCopy = [...weightData];
    currentStateCopy.shift();
    setWeightData(currentStateCopy);
  }


  // ADD WEIGHT
  function addWeight(newWeight) {
    setWeightData((prevWeightData) => {
      return [...prevWeightData, newWeight];
    });
  }

  // TODO LETZTE WOCHE GEWICHT ABZIEHEN

  // WENN INDEX DAVOR GRÖSSER IST ALS DANACH dann FARBE GRÜN SONST ROT
  // ICH BRAUCHE IMMER DEN LETZTEN INDEX UND DEN DAVOR
  let stroke = ["#00af91"];
  if (weightData.length >= 2) {
    if (weightData[weightData.length -2].weight > weightData[weightData.length -1].weight) {
      stroke = ["#00af91"]
    } else {
      stroke = ["#f58634"];
    }
  }

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div> 
  } else {
    return (
      <div className="root-container">
        <h1>Hallo User</h1>
        <Weight onAdd={addWeight} weightData={weightData} />
        <LoginButton />
        <LogoutButton />
        <Profile />
        <div className="chart-container">
        <LineChart width={400} height={200} data={weightData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="Gewicht[kg]" type="monotone" dataKey="weight" stroke={stroke} strokeWidth="2
          " />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend verticalAlign="top" height={36}/>
          <XAxis dataKey="date" />
          <YAxis dataKey="weight"/>
          <Tooltip />
        </LineChart>
        </div>
      </div>
    );
  }


}

export default App;
