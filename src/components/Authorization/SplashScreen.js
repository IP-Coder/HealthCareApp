import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
const SplashScreen = (props) => {
    let history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/auth//check-login', {
                    method: 'POST',
                    body: JSON.stringify({ token: localStorage.getItem('authtoken') }),
                    headers: { 'Content-Type': 'application/json', }
                });
                const data = await response.json();
                console.log(data.isLoggedIn)
                if (data.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    // display error message
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchdata();
    }, []);

    useEffect(() => {
        if (isLoggedIn === true) {
            history('/Hospital')
        } else if (isLoggedIn === false) {
            history('/login')
        }
    }, [isLoggedIn]);

    return (
        <div class="splash">
            <div class="splash-image">
                <img src="/Design/favicon.webp" width="505" alt="Splash Image" />
                <h3>Loading...</h3>
                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />
                    <LinearProgress color="success" />
                    <LinearProgress color="inherit" />
                </Stack>
            </div>
        </div>
    );
};

export default SplashScreen;



