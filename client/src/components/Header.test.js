import React from "react";
import ReactDOM from "react-dom";
import { render, screen, fireEvent, findByText, findByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"; 

// MOCK AUTH 0

// const user = {
//   email: "johndoe@me.com",
//   email_verified: true,
//   sub: "google-oauth2|12345678901234"
// };

// intercept the useAuth0 function and mock it
// jest.mock("@auth0/auth0-react");

// describe("First test", () => {

  // const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  // beforeEach(() => {
  //   useAuth0.mockReturnValue({
  //     isAuthenticated: true,
  //     user,
  //     logout: jest.fn(),
  //     loginWithRedirect: jest.fn()
  //   });
  // });

  // test("Logout Button displays when logged in", () => {
  //   render(
  //           <Header />
  //   );
  //   const loginButton = screen.getByText(/Logout/i);
  //   expect(loginButton).toBeInTheDocument();
  // });

  // const { getByText } = render(
  //     <Header />
  // );

  //screen.getByRole("button", { name: /Login/i });

// });

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
});

it("renders an image-logo", () => {
  const { getByAltText } = render(<Header />);
  expect(getByAltText("Logo")).toBeInTheDocument()
})

// it("renders a login button", () => {

  // const { getByText } = render(
  //   <Auth0Provider>
  //     <Header />
  //   </Auth0Provider> 
  // );


  // screen.getByRole("button", { name: /Login/i });

  // expect(screen.queryByText("Login")).toBeInTheDocument();


  //fireEvent.click(getByText("Login"));
  


  // const mock = jest.fn();
  // console.log(mock);

  // mock.mockReturnValueOnce("Hallo Ingo");

  // mock();

  // expect(mock).toHaveBeenCalledTimes(1);
// })

  // What I want
  // click event with "Login"
  // expect button name to be logout
  // click event with "Logout"
  // except button name to be login



  // BUTTON TEXT
  //expect(getByText(/([A-z])\w+/)).toBeInTheDocument();
  // TODO INTEGRATION TEST FOR THE BUTTONS
  // // CLICK AT ANMELDEN
  // fireEvent.click(getByText("Anmelden"));

  // fireEvent.click(getByText("Anmelden"), rightClick)
  // // AFTER ANMELDEN CLICKED CHANGE TO ABMELDEN

  //await screen.findByText('Abmelden')
  //expect(await findByRole('button', { name: 'Abmelden' })).toBeInTheDocument();

  // // CLICK AT ABMELDEN
  // fireEvent.click(screen.getByText("Abmelden"));
  // // TEXT EXPECTED TO BE ANMELDEN
  // expect(screen.getByText("Anmelden")).toBeInTheDocument();

// it("renders a logout button", () => {
//   const { getByText } = render(<Header />);
//   expect(getByText("Abmelden")).toBeInTheDocument()
// })