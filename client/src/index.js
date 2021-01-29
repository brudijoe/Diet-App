import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// AUTH0
import { Auth0Provider} from "@auth0/auth0-react"; 

// AUTH0
const domain = process.env.REACT_APP_DIET_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_DIET_AUTH0_CLIENT_ID;

ReactDOM.render(
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      redirectUri={window.location.origin}>
      <App />
    </Auth0Provider>,
    document.getElementById('root')
  );
