import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import emailIcon from "../images/emailIcon.png";
import lockIcon from "../images/lock.png";
import { LoginContext } from "../Context/Provider";
import { LOGINUSERDETAILS } from "../Constants/ActionConstants";
import validator from "validator";
import { Login } from "../Services/ApiServices";

const useStyle = makeStyles({
  gridStyle: {
    paddingTop: "20px",
  },
  gridRowStyle: {
    padding: "10px 0px 0px 0px",
  },
  commonStyleForText: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif !important',
    fontWeight: '540 !important',
    fontize: '0.875rem !important',
    lineHeight: '1.75 !important',
    cursor: 'pointer',
    textAlign: 'left'
  },
  singupText: {
    color: '#0f0f0f',
    marginTop: '20px !important',
    textAlign: 'center',
    '& span': {
      color: '#251bf2',
    }
  },
  forgotPasswordText: {
    color: '#FA4299',
    marginBottom: '20px !important'
  },
  formStyle: {
    background: "#fff",
    padding: "40px 0px 20px 0px",
    height: "40vh",
    width: "90%",
    marginBottom: '2em',
  },
  inputFieldStyle: {
    background: "#ffffff",
    border: "none",
    "& label": {
      border: "none",
      marginTop: "-40px",
      "& p": {
        color: "rgba(0,0,0,0.7)",
      },
      "& img": {
        width: "16px",
        height: "16px",
        paddingRight: "4px",
      },
    },
  }
});

const LoginForm = (props) => {
  const classes = useStyle();
  const { state, dispatch } = useContext(LoginContext);
  const [loginDetails, setLoginDetails] = useState({
    email: { email: "", error: false, errorMessage: "" },
    password: { password: "", error: false, errorMessage: "" },
  });
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const handleEmailChange = (e) => {
    if (loginDetails.email.email) {
      if (!validator.isEmail(loginDetails.email.email)) {
        setLoginDisabled(true);
        loginDetails.email.error = true;
        loginDetails.email.errorMessage = "Please Enter a Valid Email Id";
      } else {
        setLoginDisabled(false);

        loginDetails.email.error = false;
        loginDetails.email.errorMessage = "";
      }
    }

    setLoginDetails({
      ...loginDetails,
      email: { ...loginDetails?.email, email: e?.target?.value },
    });
  };

  const handlePasswordChange = (e) => {
    if (loginDetails.password.password) {
      if (
        !validator.isStrongPassword(loginDetails.password.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        setLoginDisabled(true);
        loginDetails.password.error = true;
        loginDetails.password.errorMessage =
          "Enter Correct password";
      } else {
        setLoginDisabled(false);

        loginDetails.password.error = false;
        loginDetails.password.errorMessage = "";
      }
    }
    setLoginDetails({
      ...loginDetails,
      password: { ...loginDetails?.password, password: e?.target?.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: loginDetails?.email?.email,
      password: loginDetails?.password?.password,
    }

    const res = await Login(payload);
    if (res?.status === 200) {
      setAccessToken(res?.data?.access_token);
      localStorage.setItem("Username", res?.data?.username);
      localStorage.setItem("access_token", res?.data?.access_token);
      dispatch({
        type: LOGINUSERDETAILS,
        payload: {
          email: loginDetails?.email?.email,
          password: loginDetails?.password?.password,
          accessToken: accessToken,
        },
      });
      // Redirect to Home page
      window.location.href = '/home'
    } else {
      alert("Please enter correct email and password");
    }

    let newLoginDetails = loginDetails;
    if (
      loginDetails.email.email === "" ||
      loginDetails.password.password === ""
    ) {
      if (loginDetails.email.email === "") {
        setLoginDisabled(true);

        newLoginDetails.email.error = true;
        newLoginDetails.email.errorMessage = "Please Enter a Email Id";
      }
      if (loginDetails.password.password === "") {
        setLoginDisabled(true);

        newLoginDetails.password.error = true;
        newLoginDetails.password.errorMessage = "Please Enter a password";
      }
    }
    setLoginDetails({ ...newLoginDetails });
  };

  return (
    <>
      <Grid
        container
        rowSpacing={2}
        className={classes.gridStyle}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <form
          className={classes.formStyle}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Grid item className={classes.gridRowStyle}>
            <TextField
              label={
                <Typography>
                  <img src={emailIcon} alt="Email Icon" className={classes.logo} />
                  Email *
                </Typography>
              }
              type="email"
              variant="outlined"
              value={loginDetails?.email?.email}
              onChange={handleEmailChange}
              // onChange={(e) => handleOnChange(e, "email")}
              margin="normal"
              fullWidth
              className={classes.inputFieldStyle}
              InputLabelProps={{
                shrink: false,
              }}
              style={{ paddingBottom: '10px' }}
              error={loginDetails.email.error}
              helperText={
                loginDetails.email.error ? loginDetails.email.errorMessage : ""
              }
            />
          </Grid>
          <Grid item className={classes.gridRowStyle}>
            <TextField
              label={
                <Typography>
                  <img src={lockIcon} alt="Lock Icon" className={classes.logo} />
                  Password *
                </Typography>
              }
              type="password"
              variant="outlined"
              value={loginDetails?.password?.password}
              onChange={handlePasswordChange}
              // onChange={(e) => handleOnChange(e, "password")}
              margin="normal"
              // required
              fullWidth
              className={classes.inputFieldStyle}
              InputLabelProps={{
                shrink: false,
              }}
              error={loginDetails.password.error}
              helperText={
                loginDetails.password.error
                  ? loginDetails.password.errorMessage
                  : ""
              }
            />
          </Grid>
          <Typography onClick={props.onForgotPasswordClick} className={`${classes.commonStyleForText} ${classes.forgotPasswordText}`}>Forgot Password ?</Typography>
          <Grid item className={classes.gridRowStyle}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className='submitButton'
              disabled={loginDisabled}
            >
              Login
            </Button>
            <Typography className={`${classes.commonStyleForText} ${classes.singupText}`}> Not a member? <span>Signup now</span></Typography>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default LoginForm;

