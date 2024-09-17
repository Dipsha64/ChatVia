import React from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function MailVerification() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const decodedToken = jwtDecode(token);
    console.log("decodedToken.." ,decodedToken);
    return ( 
        <>
        Mail Verification</>
    );
}

export default MailVerification;