import React, { useState } from "react";
import axios from "axios";
import Weight from "./Weight";
import Header from "./Header";
import Footer from "./Footer";
import Chart from "./Chart";
import logo from "../images/Diet-App-Logo.png";
// AUTH0
import { useAuth0 } from "@auth0/auth0-react";

function App(props) {
  // AUTH
  const { user, isAuthenticated, isLoading } = useAuth0();
  // STATE IS USER LOGGED IN
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  // STATE WEIGHT-DATA
  const dummyData = [{ userID: "", weight: 0, date: "" }];
  const [weightData, setWeightData] = useState(dummyData);

  // Nur in Development ausgeben 
  // console.log(weightData);

  // DUMMY Data aus dem ARRAY rauskriegen
  if (weightData.length === 2 && weightData[0].weight === "") {
    const currentStateCopy = [...weightData];
    currentStateCopy.shift();
    setWeightData(currentStateCopy);
  }

  // GET WEIGHTDATA
  // PROBLEM user.sub ist unbekannt beim laden
  // useEffect(() => {
  //     axios
  //     .get("/api/weightData/"+user.sub)
  //     .then((res) => setWeightData(res.data))
  //     .catch((err) => console.log(err));
  // },[]);

  // ANDERE LÖSUNG
  if (!userIsLoggedIn && isAuthenticated) {
    axios
      .get("/api/weightData/" + user.sub)
      .then((res) => setWeightData(res.data))
      .catch((err) => console.log(err));
    setUserIsLoggedIn(true);
  }

  // ADD WEIGHT
  function addWeight(newWeight) {
    axios
      .post("/api/weightData/" + user.sub, newWeight)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setWeightData((prevWeightData) => {
      return [...prevWeightData, newWeight];
    });
  }

  if (isLoading) {
    return (
      <div className="header">
        <h1>Diet-App</h1>
        <img id="animatedlogo" src={logo} alt="Logo"></img>
        <h4>Loading...</h4>
      </div>
    );
  } else {
    return (
      <div className="root-container">
        <Header />
        <Weight onAdd={addWeight} weightData={weightData} />
        <Chart weightData={weightData}/>
        <Footer />
      </div>
    );
  }
}

export default App;
