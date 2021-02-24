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
      weight: 76.4,
      date: "20. Februar 2021",
    },
    // {
    //   userID: "123",
    //   weight: 75.4,
    //   date: "21. Februar 2021",
    // },
  ];
  
  ReactDOM.render(
    <Weight
      weightData={testData}
    />,
    div
  );
});