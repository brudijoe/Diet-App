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
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  let currentDate = "";
  if(month < 10) {
    currentDate = day + ".0" + month + "." + year;
  } else {
    currentDate = day + "." + month + "." + year;
  }
  

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

  // LOST WEIGHT
  let firstWeightData = props.weightData[0].weight;
  let lastWeightData = props.weightData[props.weightData.length -1].weight;
  let lostWeight = firstWeightData - lastWeightData;

  return (
    isAuthenticated && (
      <div className="top-container">
        <div className="top-form">
          <form>
            <table>
              <tbody>
                  <tr>
                  <td>
                    <label>aktuelles Datum: </label>
                  </td>
                  <td>
                    <input type="text" name="date" value={currentDate} onChange={handleChange} readOnly />
                  </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Gewicht[kg]: </label>
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
                      <label>Abgenommen[kg]: </label>
                    </td>
                    <td>
                      <input type="text" name="" id="lostweight" value={lostWeight} readOnly />
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
