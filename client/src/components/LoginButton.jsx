import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {

    //AUTH0
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={(userSub) => loginWithRedirect()}>
                Anmelden
            </button>
        )
    )
}

export default LoginButton;
