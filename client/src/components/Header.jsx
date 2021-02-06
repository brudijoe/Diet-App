import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../images/Diet-App-Logo.png";

function Header() {
    //AUTH0
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <header>
            <img src={logo} alt="Logo"></img>
            
            {!isAuthenticated && (
                <button onClick={(userSub) => loginWithRedirect()}>
                    Anmelden
                </button>
            )}
            {isAuthenticated && (
                <button onClick={() => logout()}>
                    Abmelden
                </button>
            )}
        </header>
    )
}

export default Header;
