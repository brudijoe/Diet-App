import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


function Weight(props) {
  const { isAuthenticated } = useAuth0();

  // TODO STATE FÜR WEIGHT-OBJEKT ANLEGEN
  const [currentWeight, setCurrentWeight] = useState({
      weight: "",
      date: ""
  });

  // Datum für label
  const today = new Date();
  let day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = today.getMonth() + 1;
  if(month < 10) {
    month = "0" + month;
  }
  const year = today.getFullYear();
  const currentDate = day + "." + month + "." + year;
  

  function handleChange(event) {
    const { name, value } = event.target;

    // BEST PRACTICE?
    setCurrentWeight({
      weight: "",
      date: currentDate
    });

    setCurrentWeight((prevWeight) => {
      return {
        ...prevWeight,
        [name]: value
      };
    });
  }

  // SUBMIT WEIGHT
  function submitWeight(event) {
    setCurrentWeight({
      weight: "",
      date: currentDate
    });
    props.onAdd(currentWeight);
    event.preventDefault();
  }

  // WEIGHT PROGRESS
  let lastWeightData = "";
  let weightBeforeLastWeightData = "";
  let lastWeightProgress = "";
  let firstWeightData = "";
  let lostWeightProgress = "";

  if (props.weightData.length >= 2) {
    // LAST WEIGHT PROGRESS
    lastWeightData = props.weightData[props.weightData.length -1].weight;
    weightBeforeLastWeightData = props.weightData[props.weightData.length -2].weight;
    lastWeightProgress = weightBeforeLastWeightData - lastWeightData + " KG";
    // OVERALL WEIGHT PROGRESS
    firstWeightData = props.weightData[0].weight;
    lastWeightData = props.weightData[props.weightData.length -1].weight;
    lostWeightProgress = firstWeightData - lastWeightData + " KG";
  }

  return (
    isAuthenticated && (
      <div className="top-container">
          <form>
          <div class="form-group">
            <label>Datum: </label>
            <input type="text" class="form-control" name="date" value={currentDate} onChange={handleChange} readOnly />
          </div>

          <div class="form-group">
            <label>Momentanes Gewicht in KG: </label>
            <input
              type="number"
              class="form-control"
              name="weight"
              min="1"
              max="999"
              minlength="1"
              maxlength="3"
              value={currentWeight.weight}
              onChange={handleChange}
            />
            <small id="emailHelp" class="form-text text-muted">Wöchentlich wiegen</small>
          </div>

          <div class="form-group">
            <label>Gewichtsdifferenz seit letzter Woche: </label>
            <input type="text" class="form-control" name="" value={lastWeightProgress} readOnly />
          </div>

          <div class="form-group">
            <label>Gesamtdifferenz: </label>
            <input type="text" class="form-control" name="" value={lostWeightProgress} readOnly />
          </div>
            <button id="submitweightbutton" onClick={submitWeight}>
                        Bestätigen
            </button>
          </form>
      </div>
    )
  )
}

export default Weight;
