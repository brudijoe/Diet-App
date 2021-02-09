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
  const dateOptions = {
      day: "numeric",
      month: "long",
      year: "numeric"
  }
  const currentDate = today.toLocaleDateString("de-DE", dateOptions);

  function handleChange(event) {
    const { name, value } = event.target;

    // BEST PRACTICE?
    setCurrentWeight({
      userID: user.sub,
      weight: "",
      date: currentDate,
    });

    setCurrentWeight((prevWeight) => {
      // Nur in Development ausgeben
      // console.log(prevWeight);
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
  let progressOverall = 0;
  let progressYear = 0;
  let progressMonth = 0;
  let progressWeek = 0;
  let progressNow = 0;

  if (props.weightData.length >= 2) {
    // TODO PROGRESS OVERALL
    let firstEntryProgressOverall = props.weightData[0].weight;
    let lastEntryProgressOverall = props.weightData[props.weightData.length - 1].weight;
    progressOverall = Number(firstEntryProgressOverall - lastEntryProgressOverall).toFixed(1);
    if (progressOverall < 0) {
      progressOverall = -1 * progressOverall + " KG zugenommen.";
    } else {
      progressOverall = progressOverall + " KG abgenommen";
    }
    // TODO PROGRESS YEAR
    const currentYear = today.toLocaleDateString("de-DE", {year:"numeric"});;
    const currentYearPattern = new RegExp("\\b"+currentYear+"\\b");
    let progressYearArray = props.weightData.filter(arrayEntry => currentYearPattern.test(arrayEntry.date));
    // CALCULATION FIRST ENTRY - LAST ENTRY
    let firstEntryProgressYear = progressYearArray[0].weight;
    let lastEntryProgressYear = progressYearArray[progressYearArray.length - 1].weight;
    progressYear = Number(firstEntryProgressYear - lastEntryProgressYear).toFixed(1);
    if (progressYear < 0) {
      progressYear = -1 * progressYear + " KG zugenommen.";
    } else {
      progressYear = progressYear + " KG abgenommen";
    }
    // TODO PROGRESS MONTH
    const currentMonth = today.toLocaleDateString("de-DE", {month:"long"});;
    const currentMonthPattern = new RegExp("\\b"+currentMonth+"\\b");
    let progressMonthArray = props.weightData.filter(arrayEntry => currentMonthPattern.test(arrayEntry.date));
    // CALCULATION FIRST ENTRY - LAST ENTRY
    let firstEntryProgressMonth = progressMonthArray[0].weight;
    let lastEntryProgressMonth = progressMonthArray[progressMonthArray.length - 1].weight;
    progressMonth = Number(firstEntryProgressMonth - lastEntryProgressMonth).toFixed(1);
    if (progressMonth < 0) {
      progressMonth = -1 * progressMonth + " KG zugenommen.";
    } else {
      progressMonth = progressMonth + " KG abgenommen";
    }
    // TODO PROGRESS WEEK

    // TODO CURRENT PROGRESS
    let lastEntryProgressNow = props.weightData[props.weightData.length - 1].weight;
    let beforeLastEntryProgressNow =
      props.weightData[props.weightData.length - 2].weight;
    progressNow = Number(
      beforeLastEntryProgressNow - lastEntryProgressNow
    ).toFixed(1);
    if (progressNow < 0) {
      progressNow = -1 * progressNow + " KG zugenommen.";
    } else {
      progressNow = progressNow + " KG abgenommen";
    }
    
  }

  return (
    isAuthenticated && (
      <form>
        <div className="input-container">
          <label id="labeldate">Datum: </label>
          <label
            id="labeldatevalue"
            className="form-control"
            name="date"
            onChange={handleChange}
          >
            {currentDate}
          </label>

          <label id="labelweight">Aktuelles Gewicht in KG eingeben: </label>
          <input
            type="number"
            id="inputweight"
            className="form-control"
            name="weight"
            min="1"
            max="999"
            minLength="1"
            maxLength="3"
            value={currentWeight.weight}
            onChange={handleChange}
          />
          <button id="submitweightbutton" onClick={submitWeight}>
            <span>Absenden</span>
          </button>
        </div>

        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td id="table-top-left">Gesamt:</td>
                <td id="table-top-right">{progressOverall}</td>
              </tr>
              <tr>
                <td>Jahr:</td>
                <td>{progressYear}</td>
              </tr>
              <tr>
                <td>Monat:</td>
                <td>{progressMonth}</td>
              </tr>
              <tr>
                <td>Woche:</td>
                <td>5 KG</td>
              </tr>
              <tr>
                <td id="table-bottom-left">Aktuell:</td>
                <td id="table-bottom-right">{progressNow}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    )
  );
}

export default Weight;
