import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../images/Diet-App-Header.png";

function Header() {
    //AUTH0
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <header>

            <div className="headerheading">
                <img src={logo} alt="Logo"></img>
            </div>

            <div className="headerbutton">
                {!isAuthenticated && (
                    <button  onClick={(userSub) => loginWithRedirect()}>
                        Anmelden
                    </button>
                )}
                {isAuthenticated && (
                    <button onClick={() => logout()}>
                        Abmelden
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header;
