import React, { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../images/logo.png";
import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";
import ForgotPassword from "../Components/ForgotPassword";
import backgroundImage from "../images/backgroundImage.webp";
import userDataLogo from "../images/udcLogo.png";
// import userDataLogo from "../images/logo.ico";

const useStyle = makeStyles({
  heading: {
    // border: '1px solid red',
    transition: 'all 0.6s cubiz-bezier(0.68,-0.55,0.265,1.55)',
    fontSize: '30px !important',
    fontWeight: '600 !important',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00183D !important',
    '& img': {
      width: '30px !important',
      marginRight: '10px'
    }
    // width:'50%'
  },
  loginContainer: {
    backgroundColor: '#00183D',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100vh'
  },
  loginFormContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    '& img': {
      width: '50%'
    }
    // '& h4':{
    //     fontFamily: 'Baloo Bhaijaan',
    //     fontStyle: 'normal',
    //     fontWeight: '400',
    //     fontSize: '30px',
    //     lineHeight: '36px',
    //     letterSpacing: '0.02em',
    //     color: '#FFFFFF',
    //     textShadow: '3px rgba(0, 0, 0, 0.25)',
    // }
  },
  loginButton: {
    color: '#000 !important',
    fontSize: '18px !important',
    fontWeight: '500 !important',
    textAlign: 'center !important',
    lineHeight: '28px !important',
    cursor: 'pointer !important',
    zIndex: '1 !important',
    width: '50%',
    textTransform: 'capitalize !important',
    transition: 'all 0.6s ease !important',
    border: '1px solid lightgrey !important',
    borderRadius: '5px !important',
    marginTop: '20px !important'
  },
  activeButton: {
    backgroundColor: '#FF7425 !important',
    borderColor: '#FF7425 !important',
    color: '#fff !important',
  }
})

const Login = () => {
  const classes = useStyle();

  const [loginVisible, setLoginVisible] = useState(true);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  useEffect( () => {

    if (localStorage?.getItem("access_token")){
      window.location.href = '/home'
    }
  }, []);
  return (
    <div className={classes.loginContainer}>
      <Grid container className={classes.loginFormContainer} md="3.5" xs="10" display='flex' justifyContent="center">
        {/* <img src={logo} alt='The Math Company'/> */}
        <Typography variant="h4" className={classes?.heading}>
          <img src={userDataLogo} alt='UserDaraCentralLogo' /><strong>User<span style={{ color: '#FF7425' }}>Data</span>Center</strong>
        </Typography>
        {!forgotPasswordVisible && (
          <>
            <div style={{ width: '90%' }}>
              <Button onClick={(e) => setLoginVisible(true)} className={loginVisible ? ` ${classes.activeButton} ${classes.loginButton}` : classes.loginButton}>Login</Button>
              <Button onClick={(e) => setLoginVisible(false)} className={!loginVisible ? ` ${classes.activeButton} ${classes.loginButton}` : classes.loginButton}>Sign Up</Button>
            </div>
            {loginVisible && (
              <Grid container>
                {/* <Grid item xs="1" md="3"></Grid> */}
                <Grid item xs="12" md="12">
                  <>
                    <LoginForm onForgotPasswordClick={() => setForgotPasswordVisible(true)} />
                    {/* <Button onClick={(e) => setForgotPasswordVisible(true)}>Forgot Password?</Button> */}
                  </>
                </Grid>
                {/* <Grid item xs="1" md="3"></Grid> */}
              </Grid>
            )}
            {!loginVisible && (
              <Grid container marginTop={2}>
                <Grid item xs="1" md="3"></Grid>
                <Grid item xs="12" md="12">
                  <SignupForm />
                </Grid>
                <Grid item xs="1" md="3"></Grid>
              </Grid>
            )}
          </>
        )}

        {forgotPasswordVisible && <ForgotPassword />}
      </Grid>
    </div>
  );
};

export default Login;


