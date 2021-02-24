import React from "react";
import ReactDOM from "react-dom";
import Chart from "./Chart";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const testData = [
    {
      userID: "123",
      weight: 76.4,
      date: "20. Februar 2021",
    },
    {
      userID: "123",
      weight: 75.4,
      date: "21. Februar 2021",
    },
  ];

  ReactDOM.render(
    <Chart
      weightData={testData}
    />,
    div
  );
});