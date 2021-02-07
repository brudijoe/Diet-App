import React, { useState } from "react";
import axios from "axios";
import Weight from "./Weight";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../images/Diet-App-Logo.png";
// AUTH0
import { useAuth0 } from "@auth0/auth0-react";
// CHART
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

  // TODO LETZTE WOCHE GEWICHT ABZIEHEN

  // WENN INDEX DAVOR GRÖSSER IST ALS DANACH dann FARBE GRÜN SONST ROT
  // ICH BRAUCHE IMMER DEN LETZTEN INDEX UND DEN DAVOR
  let stroke = ["#00af91"];
  if (weightData.length >= 2) {
    if (
      weightData[weightData.length - 2].weight >
      weightData[weightData.length - 1].weight
    ) {
      stroke = ["#00af91"];
    } else {
      stroke = ["#f58634"];
    }
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
        {isAuthenticated && (
          <div className="chart-container">
            <ResponsiveContainer width="95%" height={400}>
              <LineChart
                data={weightData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line
                  name="Gewicht[KG]"
                  type="monotone"
                  dataKey="weight"
                  stroke={stroke}
                  strokeWidth="2"
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36} />
                <XAxis dataKey="date" />
                <YAxis dataKey="weight" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
