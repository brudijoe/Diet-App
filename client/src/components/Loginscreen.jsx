import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import home from "../images/Demo.png";

function Loginscreen() {

    const {isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className="loginscreen">
                <h1>Verfolge deine Diäterfolge.</h1>
                <h2>Demo:</h2>
                <img src={home} alt="Demo"></img>
            </div>
        )
    );
}

export default Loginscreen;
