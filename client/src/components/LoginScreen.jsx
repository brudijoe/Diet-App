import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function LoginScreen() {

    //AUTH0
    const { isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className="loginscreen">
                <h1>Lose Weight</h1>
            </div>
        )
    )
}

export default LoginScreen;
