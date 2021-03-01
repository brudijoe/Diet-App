import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Weight(props) {
  // AUTH0
  const { user, isAuthenticated } = useAuth0();

  // STATE FOR WEIGHT OBJECT
  const [currentWeight, setCurrentWeight] = useState({
    userID: "",
    weight: 0,
    date: "",
  });

  // REMOVE DEFAULT DATA FROM ARRAY
  if (currentWeight.length === 2 && currentWeight[0].userID === "") {
    const currentStateCopy = [...setCurrentWeight];
    currentStateCopy.shift();
    setCurrentWeight(currentStateCopy);
  }

  // STATE FOR SUBMIT BUTTON
  const [isSubmitted, setisSubmitted] = useState(false);
  // STEATE FOR FOCUS
  const [isFocused, setisFocused] = useState(false);

  // DATE
  const today = new Date();
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let currentDate = today.toLocaleDateString("de-DE", dateOptions);
  let currentMonth = today.toLocaleDateString("de-DE", { month: "long" });
  let currentYear = today.toLocaleDateString("de-DE", { year: "numeric" });

  // FUNCTIONS
  function handleFocus() {
    setisFocused(true);
    currentWeight.weight = "";
    isFocused ?? setisFocused(false)
  }

  function handleChange(event) {
    const { name, value } = event.target;
    // TODO CHECK FOR IMPROVEMENTS
    setCurrentWeight({
      userID: user.sub,
      weight: 0,
      date: currentDate,
    });

    setCurrentWeight((prevWeight) => {
      return {
        userID: user.sub,
        ...prevWeight,
        [name]: value
      };
    });
  }
  // SUBMIT WEIGHT
  function submitWeight(event) {
    // WENN NICHT HEUTE UND NICHT LEER
    if (props.weightData[props.weightData.length - 1].date !== currentDate && props.weightData.length < 1) {
      // WENN GEWICHT NICHT NULL ODER GEWICHT NICHT KLEINER ALS EINS
      if (
        currentWeight.weight !== 0 ||
        currentWeight.weight > 1
      ) {
        props.onAdd(currentWeight);
      }
    }
    setCurrentWeight({
      userID: user.sub,
      weight: 0,
      date: currentDate,
    });

    setisSubmitted(true);
    event.preventDefault();
  }

  // WEIGHT PROGRESS
  let progressOverall = 0;
  let progressYear = 0;
  let progressMonth = 0;
  let progressWeek = 0;
  let progressCurrent = 0;

  if (props.weightData.length >= 2) {
    // PROGRESS OVERALL
    let firstEntryProgressOverall = props.weightData[0].weight;
    let lastEntryProgressOverall =
      props.weightData[props.weightData.length - 1].weight;
    // CALCULATION FIRST ENTRY - LAST ENTRY
    progressOverall = Number(
      firstEntryProgressOverall - lastEntryProgressOverall
    ).toFixed(1);
    if (progressOverall < 0) {
      progressOverall = -1 * progressOverall + " KG zugenommen.";
    } else {
      progressOverall = progressOverall + " KG abgenommen.";
    }

    // PROGRESS YEAR
    const currentYearPattern = new RegExp("\\b" + currentYear + "\\b");
    let progressYearArray = props.weightData.filter((arrayEntry) =>
      currentYearPattern.test(arrayEntry.date)
    );
    // CALCULATION FIRST YEAR ENTRY - LAST YEAR ENTRY
    if(progressYearArray.length >= 2) {
      let firstEntryProgressYear = progressYearArray[0].weight;
      let lastEntryProgressYear =
        progressYearArray[progressYearArray.length - 1].weight;
      progressYear = Number(
        firstEntryProgressYear - lastEntryProgressYear
      ).toFixed(1);
      if (progressYear < 0) {
        progressYear = -1 * progressYear + " KG zugenommen.";
      } else {
        progressYear = progressYear + " KG abgenommen.";
      }
    } else {
      progressYear = 0 + " KG abgenommen.";
    }

    // PROGRESS MONTH
    const currentMonthPattern = new RegExp("\\b" + currentMonth + "\\b");
    let progressMonthArray = progressYearArray.filter((arrayEntry) =>
      currentMonthPattern.test(arrayEntry.date)
    );
    // CALCULATION FIRST MONTH ENTRY - LAST MONTH ENTRY
    if(progressMonthArray.length >= 2) {
      let firstEntryProgressMonth = progressMonthArray[0].weight;
      let lastEntryProgressMonth =
        progressMonthArray[progressMonthArray.length - 1].weight;
      progressMonth = Number(
        firstEntryProgressMonth - lastEntryProgressMonth
      ).toFixed(1);
      if (progressMonth < 0) {
        progressMonth = -1 * progressMonth + " KG zugenommen.";
      } else {
        progressMonth = progressMonth + " KG abgenommen.";
      }
    } else {
      progressMonth = 0 + " KG abgenommen.";
    }

    // PROGRESS WEEK
    let progressMonthArrayCopy = progressMonthArray;
    progressMonthArrayCopy.reverse();
    let progressWeekArrayLength = 7;
    let progressWeekArray = [];

    // CODE OPTIMIZATION: progressMonthArrayCopy can have up to 31 entries, so it should be capped at 7 for a week
    // CODE OPTIMIZATION: First 49 iterations
    // CODE OPTIMIZATION: Second 43 iterations with break statement
    // CODE OPTIMIZATION: Third 25 iterations with index2Increment
    let index2Increment = 0;
    if (progressMonthArrayCopy.length >= 7) {
      for (let index = 0; index < progressWeekArrayLength; index++) {
        for (
          let index2 = 0 + index2Increment;
          index2 < progressWeekArrayLength;
          index2++
        ) {
          let today = new Date();
          function addDays(today, days) {
            let copyToday = new Date(Number(today));
            copyToday.setDate(today.getDate() + days);
            return copyToday;
          }
          let newDate = addDays(today, -Number(index2));
          const dateOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
          };
          let testDate = newDate.toLocaleDateString("de-DE", dateOptions);

          if (progressMonthArrayCopy[index].date === testDate) {
            progressWeekArray.push(progressMonthArrayCopy[index]);
            index2Increment++;
            break;
          }
        }
      }
    } else {
      for (let index = 0; index < progressMonthArrayCopy.length; index++) {
        for (
          let index2 = 0 + index2Increment;
          index2 < progressWeekArrayLength;
          index2++
        ) {
          let today = new Date();
          function addDays(today, days) {
            let copyToday = new Date(Number(today));
            copyToday.setDate(today.getDate() + days);
            return copyToday;
          }
          let newDate = addDays(today, -Number(index2));
          const dateOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
          };
          let testDate = newDate.toLocaleDateString("de-DE", dateOptions);

          if (progressMonthArrayCopy[index].date === testDate) {
            progressWeekArray.push(progressMonthArrayCopy[index]);
            index2Increment++;
            break;
          }
        }
      }
    }

    // REVERSE ARRAY TO GET CORRECT ORDER AGAIN FOR CALCULATION
    progressWeekArray.reverse();
    if (progressWeekArray.length >= 2) {
      let firstEntryProgressWeek = progressWeekArray[0].weight;
      console.log(firstEntryProgressWeek);
      let lastEntryProgressWeek =
        progressWeekArray[progressWeekArray.length - 1].weight;
      progressWeek = Number(
        firstEntryProgressWeek - lastEntryProgressWeek
      ).toFixed(1);
      if (progressWeek < 0) {
        progressWeek = -1 * progressWeek + " KG zugenommen.";
      } else {
        progressWeek = progressWeek + " KG abgenommen.";
      }
    } else {
      progressWeek = 0 + " KG abgenommen.";
    }

    // CURRENT PROGRESS
    let lastEntryProgressCurrent =
      props.weightData[props.weightData.length - 1].weight;
    let beforelastEntryProgressCurrent =
      props.weightData[props.weightData.length - 2].weight;
    // CALCULATION LAST ENTRY - BEFORE LAST ENTRY
    progressCurrent = Number(
      beforelastEntryProgressCurrent - lastEntryProgressCurrent
    ).toFixed(1);
    if (progressCurrent < 0) {
      progressCurrent = -1 * progressCurrent + " KG zugenommen.";
    } else {
      progressCurrent = progressCurrent + " KG abgenommen.";
    }
  }

  return (
    isAuthenticated && (
      <form>
        <div className="input-container">
          <label id="labeldate">Datum: </label>
          <label id="labeldatevalue" name="date" onChange={handleChange}>
            {currentDate}
          </label>

          <label id="labelweight">Aktuelles Gewicht in KG eingeben: </label>

          {isSubmitted === true && (
            <label id="labelsubmitted">
              Bleib dran! Du kannst einmal täglich dein Gewicht eingeben.
            </label>
          )}
          {isSubmitted === false && (
            <input
              type="number"
              id="inputweight"
              name="weight"
              min="1"
              max="999"
              minLength="1"
              maxLength="3"
              value={currentWeight.weight}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          )}
          {isSubmitted === false && (
            <button id="submitweightbutton" onClick={submitWeight}>
              <span>Absenden</span>
            </button>
          )}
        </div>

        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td id="table-top-left">Gesamtfortschritt:</td>
                <td id="table-top-right">{progressOverall}</td>
              </tr>
              <tr>
                <td>Jahr {currentYear}:</td>
                <td>{progressYear}</td>
              </tr>
              <tr>
                <td>Monat {currentMonth}:</td>
                <td>{progressMonth}</td>
              </tr>
              <tr>
                <td>letzte Woche:</td>
                <td>{progressWeek}</td>
              </tr>
              <tr>
                <td id="table-bottom-left">Aktuell:</td>
                <td id="table-bottom-right">{progressCurrent}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    )
  );
}

export default Weight;
