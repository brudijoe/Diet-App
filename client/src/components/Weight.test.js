import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Weight from "./Weight";

it("renders without crashing", () => {
  const div = document.createElement("div");

  // TODO TEST WITH MORE THAN 1 TESTDATA

  const testData = [
    {
      userID: "123",
      weight: 78.4,
      date: "10. Januar 2021",
    },
    {
      userID: "123",
      weight: 79.4,
      date: "5. Februar 2021",
    },
    {
      userID: "123",
      weight: 75.4,
      date: "21. Februar 2021",
    },
    {
      userID: "123",
      weight: 77.4,
      date: "25. Februar 2021",
    },
    {
      userID: "123",
      weight: 97.4,
      date: "28. Februar 2021",
    }
  ];
  
  ReactDOM.render(
    <Weight
      weightData={testData}
    />,
    div
  );
});