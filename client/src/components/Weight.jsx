import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Weight(props) {
  const { user, isAuthenticated } = useAuth0();

  // DUMMY DATA TO PREVENT CRASHES
  const dummyData = [{ userID: "", weight: 0, date: "" }];

  // TODO STATE FÜR WEIGHT-OBJEKT ANLEGEN
  const [currentWeight, setCurrentWeight] = useState(dummyData);
  // DUMMY Data aus dem ARRAY rauskriegen
  if (currentWeight.length === 2 && currentWeight[0].userID === "") {
    const currentStateCopy = [...setCurrentWeight];
    currentStateCopy.shift();
    setCurrentWeight(currentStateCopy);
  }

  // Datum für label
  const today = new Date();
  let day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const year = today.getFullYear();
  const currentDate = day + "." + month + "." + year;

  function handleChange(event) {
    const { name, value } = event.target;

    // BEST PRACTICE?
    setCurrentWeight({
      userID: user.sub,
      weight: "",
      date: currentDate,
    });

    setCurrentWeight((prevWeight) => {
      console.log(prevWeight);
      return {
        userID: user.sub,
        ...prevWeight,
        [name]: value,
      };
    });
  }

  // SUBMIT WEIGHT
  function submitWeight(event) {
    props.onAdd(currentWeight);
    setCurrentWeight({
      userID: user.sub,
      weight: "",
      date: currentDate,
    });
    event.preventDefault();
  }

  // WEIGHT PROGRESS
  let lastWeightData = 0;
  let weightBeforeLastWeightData = 0;
  let lastWeightProgress = 0;
  let firstWeightData = 0;
  let lostWeightProgress = 0;

  if (props.weightData.length >= 2) {
    // LAST WEIGHT PROGRESS
    lastWeightData = props.weightData[props.weightData.length - 1].weight;
    weightBeforeLastWeightData =
      props.weightData[props.weightData.length - 2].weight;
    lastWeightProgress = Number(
      weightBeforeLastWeightData - lastWeightData
    ).toFixed(1);
    if (lastWeightProgress < 0) {
      lastWeightProgress = -1 * lastWeightProgress + " KG zugenommen.";
    } else {
      lastWeightProgress = lastWeightProgress + " KG abgenommen";
    }

    // OVERALL WEIGHT PROGRESS
    firstWeightData = props.weightData[0].weight;
    lastWeightData = props.weightData[props.weightData.length - 1].weight;
    lostWeightProgress = Number(firstWeightData - lastWeightData).toFixed(1);
    if (lostWeightProgress < 0) {
      lostWeightProgress = -1 * lostWeightProgress + " KG zugenommen.";
    } else {
      lostWeightProgress = lostWeightProgress + " KG abgenommen";
    }
  }

  return (
    isAuthenticated && (
      <div className="weight-container">
        <form>
          <label>Datum: </label>
          <input
            type="text"
            className="form-control"
            name="date"
            value={currentDate}
            onChange={handleChange}
            readOnly
          />

          <label>Aktuelles Gewicht in KG: </label>
          <input
            type="number"
            className="form-control"
            name="weight"
            min="1"
            max="999"
            minLength="1"
            maxLength="3"
            value={currentWeight.weight}
            onChange={handleChange}
          />

          <label>Gewicht seit letzter Woche: </label>
          <input
            type="text"
            className="form-control"
            name="lastWeightProgress"
            value={lastWeightProgress}
            readOnly
          />

          <label>Gesamtfortschritt: </label>
          <input
            type="text"
            className="form-control"
            name="lostWeightProgress"
            value={lostWeightProgress}
            readOnly
          />

          <button id="submitweightbutton" onClick={submitWeight}>
            <span>Absenden</span>
          </button>
        </form>
      </div>
    )
  );
}

export default Weight;
