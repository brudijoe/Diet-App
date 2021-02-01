import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


function Weight(props) {
  const { user, isAuthenticated } = useAuth0();

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

  // LAST WEIGHT PROGRESS
  let lastWeightData = props.weightData[props.weightData.length -1].weight;
  let weightBeforeLastWeightData = "";
  let lastWeightProgress = ""
  if (props.weightData.length >= 2) {
    weightBeforeLastWeightData = props.weightData[props.weightData.length -2].weight;
    lastWeightProgress = weightBeforeLastWeightData - lastWeightData;
  }

  // OVERALL WEIGHT PROGRESS
  let firstWeightData = props.weightData[0].weight;
  lastWeightData = props.weightData[props.weightData.length -1].weight;
  let lostWeightProgress = firstWeightData - lastWeightData;

  return (
    isAuthenticated && (
      <div className="top-container">
        <div className="top-form">
          <form>
            <table>
              <tbody>
                  <tr>
                    <td style={{textAlign: "center"}} colSpan="3">
                      Fortschritt
                    </td>
                  </tr>
                  <tr>
                  <td>
                    <label>Datum: </label>
                  </td>
                  <td>
                    <input type="text" name="date" value={currentDate} onChange={handleChange} readOnly />
                  </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Gewicht: </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="weight"
                        value={currentWeight.weight}
                        onChange={handleChange}
                        placeholder="Wöchentlich wiegen"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>letzte Woche: </label>
                    </td>
                    <td>
                      <input type="text" name="" value={lastWeightProgress} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Gesamt: </label>
                    </td>
                    <td>
                      <input type="text" name="" value={lostWeightProgress} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1"></td>
                    <td colSpan="2">
                      <button id="submitbutton" onClick={submitWeight}>
                        Bestätigen
                      </button>
                    </td>
                  </tr>
                </tbody>
            </table>
          </form>
        </div>
      </div>
    )
  );
}

export default Weight;
