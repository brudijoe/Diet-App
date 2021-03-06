import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Weight from "./Weight";
import Header from "./Header";
import Footer from "./Footer";
import Chart from "./Chart";
import Loginscreen from "./Loginscreen";

function App(props) {
  // AUTH0
  const { user, isAuthenticated, isLoading } = useAuth0();

  // STATE IS USER LOGGED IN
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);

  // STATE WEIGHT-DATA
  const [weightData, setWeightData] = useState([]);

  // REMOVE DEFAULT DATA FROM ARRAY
  if (weightData.length === 2 && weightData[0].userID === "") {
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

  // ANOTHER SOLUTION
  if (!isUserLoggedIn && isAuthenticated) {
    axios
      .get("/api/weightData/" + user.sub)
      .then((res) => setWeightData(res.data))
      .catch((err) => console.log(err));
    setisUserLoggedIn(true);
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
      <div className="root-container">
        <Header />
        <h4>Loading...</h4>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="root-container">
        <Header />
        <Loginscreen />
        <Weight onAdd={addWeight} weightData={weightData} />
        <Chart weightData={weightData}/>
        <Footer />
      </div>
    );
  }
}

export default App;
