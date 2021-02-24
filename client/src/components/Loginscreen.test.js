import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Loginscreen from "./Loginscreen";

it("renders Loginscreen without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Loginscreen />, div);
});

// TODO MESSAGE FLEXIBLE like regex
it("renders a message welcome message", () => {
  const welcomeMessage = "Verfolge deine Diäterfolge.";
  const { getByText } = render(<Loginscreen items={welcomeMessage} />);

  expect(getByText(welcomeMessage)).toBeInTheDocument()
})

it("renders a demo note", () => {
  const { getByText } = render(<Loginscreen />);
  expect(getByText(/Demo:/i)).toBeInTheDocument()
  //screen.getByRole("h3", { name: /Demo:/i });
})

it("renders an demo image", () => {
  const { getByAltText } = render(<Loginscreen />);
  //expect(getByAltText("Demo")).toBeInTheDocument()
  // Solche Tests sind besser weil die das Element angeben + Name
  screen.getByRole("img", { name: /Demo/i });
})