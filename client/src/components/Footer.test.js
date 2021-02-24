import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

it("renders Footer without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Footer />, div);
});

it("renders a text and date", () => {
  const { getByTestId } = render(<Footer />);
  expect(getByTestId("test-footer")).toBeInTheDocument();
})

