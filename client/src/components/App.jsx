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

function App() {

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

  //   // ABGENOMMEN
  //   let lostWeight = startWeight - weight;
  //   document.getElementById("lostweight").value = lostWeight;
  //   // WENN ZU GENOMMEN BORDER-COLOR ÄNDERN
  //   if (weight < startWeight) {
  //     borderColor = ["rgba(0, 175, 145, 1)"];
  //   } else {
  //     borderColor = ["rgba(245, 134, 52, 1)"];
  //   }
  // }

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
          <Line name="Gewicht[kg]" type="monotone" dataKey="weight" stroke="#8884d8" />
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
