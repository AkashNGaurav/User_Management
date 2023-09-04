import React, { useState } from "react";
import { TextField, Typography, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import emailIcon from "../images/emailIcon.png";
import validator from "validator";
import SecurityQuestion from "./SecurityQuestion";
import { ForgotPasswordAPI } from "../Services/ApiServices";

const useStyle = makeStyles({
  gridStyle: {
    paddingTop: "20px",
  },
  gridRowStyle: {
    padding: "10px",
  },
  formStyle: {
    background: "#fff",
    padding: "20px",
    height: "24vh",
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
  },
  signupButtonText: {
    color: "rgba(0, 0, 0, 0.7)",
    background: "#FF7425 !important",
    boxShadow: "4px 4px 4px #7B7B7B",
    borderRadius: "0px",
    fontSize: '18px !important',
    fontWeight: '500 !important',
    textAlign: 'center !important',
    lineHeight: '28px !important',
    cursor: 'pointer !important',
    zIndex: '1 !important',
    width: '100% !important',
    textTransform: 'capitalize !important',
    transition: 'all 0.6s ease !important',
  }
});

const ForgotPassword = () => {
  const classes = useStyle();

  const [email, setEmail] = useState({
    email: "",
    error: false,
    errorMessage: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [showSecurityQues, setShowSecurityQues] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const handleEmailChange = (e) => {
    if (email?.email) {
      if (!validator.isEmail(email?.email)) {
        setSubmitDisabled(true);
        email.error = true;
        email.errorMessage = "Please Enter a Valid Email Id";
      } else {
        setSubmitDisabled(false);

        email.error = false;
        email.errorMessage = "";
      }
    }

    setEmail({
      ...email,
      email: e?.target?.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);
    const payload = {
      email: email?.email,
    }
    const res = await ForgotPasswordAPI(payload);
    console.log(res)
    // console.log(res);
    if (res?.status === 200) {
      setShowSecurityQues(true);
      setSecurityQuestion(res?.data?.security_question);
      setSecurityAnswer(res?.data?.security_answer);
    }
  }

  return (
    <>
      {!showSecurityQues &&
        <Grid container rowSpacing={2}
          md="12" xs="12"
          className={classes.gridStyle}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <form onSubmit={handleSubmit} className={classes.formStyle}>
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
                value={email?.email}
                onChange={handleEmailChange}
                margin="normal"
                fullWidth
                className={classes.inputFieldStyle}
                InputLabelProps={{
                  shrink: false,
                }}
                error={email?.error}
                helperText={email?.error ? email?.errorMessage : ""}
              />
            </Grid>
            <Grid item className={classes.gridRowStyle}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.signupButtonText}
                disabled={submitDisabled}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>}
      {showSecurityQues && <SecurityQuestion email={email?.email} ques={securityQuestion} ans={securityAnswer} />}
    </>
  );
};

export default ForgotPassword;
