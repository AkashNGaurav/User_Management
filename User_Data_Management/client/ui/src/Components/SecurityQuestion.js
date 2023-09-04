import React, { useState } from "react";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PasswordResetAPI } from "../Services/ApiServices";
import SuccessBanner from "./SuccessBanner";
import validator from "validator";

const useStyle = makeStyles({
  gridStyle: {
    paddingTop: "20px",
  },
  gridRowStyle: {
    padding: "20px",
  },
  formStyle: {
    background: "#fff",
    padding: "0px 20px 20px 20px 20px",
    height: "fit-content",
    width: "90%",
    marginBottom: "2em",
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
    },
  },
  subHeaderText: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif !important',
    fontWeight: '540 !important',
    fontize: '0.875rem !important',
    lineHeight: '1.75 !important',
    textAlign: 'left'
  }
});

const SecurityQuestion = ({ email, ques, ans }) => {
  const classes = useStyle();

  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const [securityAns, setSecurityAns] = useState("");
  const [password, setPassword] = useState({ password: "", error: false, errorMessage: "" });
  const [rePassword, setRePassword] = useState({ password: "", error: false, errorMessage: "" });
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (securityAns.toLowerCase() === ans.toLowerCase()) {
      setShowPasswordResetForm(true);
    }
  };

  const handlePasswordChange = (e) => {
    if (password?.password) {
      if (
        !validator.isStrongPassword(password.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        password.error = true;
        password.errorMessage = "Entered password is not strong, include uppercase, number ,symbol and lowerCase";
      } else {
        password.error = false;
        password.errorMessage = "";
      }
    }
    setPassword({ ...password, password: e?.target?.value });
  }

  const handleReEnterPassword = (e) => {
    let pwd = e?.target?.value;
    if (password?.password !== pwd) {
      rePassword.error = true;
      rePassword.errorMessage = "Password does not match";
    } else {
      rePassword.error = false;
      rePassword.errorMessage = "";
    }

    setRePassword({ ...rePassword, password: pwd });
  };

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      securityQuestion: ques,
      securityAns: ans,
      password: rePassword?.password,
    };
    const res = await PasswordResetAPI(payload);
    if (res?.status === 200) {
      console.log("DATA:: ", res?.data)
      setShowSuccessBanner(true);
    }
  };

  return (
    <div>
      <>
        <Typography variant="h6" p={"40px"} className={classes.subHeaderText}>
          Please answer the security question
        </Typography>
        <Grid
          container
          rowSpacing={2}
          className={classes.gridStyle}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit} className={classes.formStyle}>
            <Grid item className={classes.gridRowStyle}>
              <TextField
                label={<Typography>{ques}</Typography>}
                type="text"
                variant="outlined"
                value={securityAns}
                onChange={(e) => setSecurityAns(e?.target?.value)}
                fullWidth
                className={classes.inputFieldStyle}
                InputLabelProps={{
                  shrink: false,
                }}
              />
            </Grid>
            <Grid item className={classes.gridRowStyle}>
              <Button type="submit" variant="contained" fullWidth className='submitButton'>
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </>
      {/* )} */}

      {showPasswordResetForm && (
        <Grid
          container
          rowSpacing={2}
          className={classes.gridStyle}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handlePasswordResetSubmit} className={classes.formStyle}>
            <Grid item className={classes.gridRowStyle}>
              <TextField
                label={<Typography>Enter new password</Typography>}
                type="password"
                variant="outlined"
                value={password?.password}
                onChange={handlePasswordChange}
                fullWidth
                className={classes.inputFieldStyle}
                InputLabelProps={{
                  shrink: false,
                }}
                error={password?.error}
                helperText={
                  password?.error
                    ? password?.errorMessage
                    : ""
                }
              />
            </Grid>
            <Grid item className={classes.gridRowStyle}>
              <TextField
                label={<Typography>Re-Enter new password</Typography>}
                type="password"
                variant="outlined"
                value={rePassword?.password}
                onChange={handleReEnterPassword}
                fullWidth
                className={classes.inputFieldStyle}
                InputLabelProps={{
                  shrink: false,
                }}
                error={rePassword?.error}
                helperText={
                  rePassword?.error
                    ? rePassword?.errorMessage
                    : ""
                }
              />
            </Grid>
            <Grid item className={classes.gridRowStyle}>
              <Button type="submit" variant="contained" fullWidth className='submitButton' >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      )}

      {showSuccessBanner && <SuccessBanner text="Password reset successful" />}
    </div>
  );
};

export default SecurityQuestion;
