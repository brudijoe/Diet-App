import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
    //AUTH0
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <header>
            <h1>Lose Weight</h1>
            
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
