import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  FormControl,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SignUpContext } from "../Context/Provider";
import { SignUpUserDetails } from "../Constants/ActionConstants";
import validator from "validator";
import { Signup } from "../Services/ApiServices";
import SuccessBanner from "./SuccessBanner";
import { qualificationData, locationData, profileData, departmentData, securityQuestionData } from "../Constants/data";

const useStyle = makeStyles({
  gridStyle: {
    paddingTop: "20px",
  },
  gridRowStyle: {
    padding: "10px 0px 10px 0px",
  },
  formStyle: {
    background: "#fff",
    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.4)",
    width: "90%",
  },
  inputGridContainer: {
    overflowY: "scroll",
    height: "60vh",
  },
  inputFieldStyle: {
    background: "#ffffff",
    paddingBottom: "20px",
    "& label": {
      marginTop: "-40px",
      "& p": {
        color: "rgba(0,0,0,0.7)",
      },
    },
  },
  labelStyle: {
    marginTop: "-5px",
  },
  formControlStyle: {
    textAlign: "left",
    width: "95%",
    "& label": {
      color: "#4C4C4C",
      paddingLeft: "16px",
    },
  }
});

// const locationData = [
//   {
//     countryId: "1",
//     country: "India",
//     state: [
//       { stateId: "s11", stateName: "Karnataka" },
//       { stateId: "s12", stateName: "Tamil Nadu" },
//       { stateId: "s13", stateName: "Maharashtra" },
//       { stateId: "s14", stateName: "Punjab" },
//       { stateId: "s15", stateName: "Delhi" },
//     ],
//   },
//   {
//     countryId: "2",
//     country: "USA",
//     state: [
//       { stateId: "s21", stateName: "California" },
//       { stateId: "s22", stateName: "Florida" },
//       { stateId: "s23", stateName: "Illinois" },
//       { stateId: "s24", stateName: "Indiana" },
//       { stateId: "s25", stateName: "Montana" },
//       { stateId: "s26", stateName: "Nevada" },
//       { stateId: "s27", stateName: "Michigan" },
//     ],
//   },
//   {
//     countryId: "3",
//     country: "Canada",
//     state: [
//       { stateId: "s31", stateName: "Alberta" },
//       { stateId: "s32", stateName: "Ontario" },
//       { stateId: "s33", stateName: "Manitoba" },
//       { stateId: "s34", stateName: "British Columbia" },
//     ],
//     // state: ['Alberta','British Columbia','Ontario','Manitoba']
//   },
// ];

// const qualificationData = [
//   "MBA",
//   "BBA",
//   "M.Tech/ME",
//   "B.Tech/BE",
//   "Psychology",
//   "Sociology",
//   "B.Ed",
//   "M.Ed",
//   "B.Com",
//   "CA/CFA",
//   "HSC",
//   "SSC",
// ];

// const profileData = [
//   "Analyst",
//   "Associate",
//   "Senior Associate",
//   "Management Consultant",
//   "Associate Principal",
//   "Partner",
//   "Co-Founder",
// ];

// const departmentData = [
//   "Human Resources",
//   "Sales",
//   "Marketing",
//   "Product development",
//   "Quality Assurance",
//   "Research and development",
//   "Finance",
//   "Product Management",
// ];

// const securityQuestionData = [
//   "What is your mother's maiden name?",
//   "What is the name of your first pet?",
//   "What is your favorite book?",
//   "What is your favorite movie?",
//   "What is your favorite color?",
//   "What is your favorite food?",
//   "In what city were you born?",
//   "What is the name of your high school?",
//   "What is your favorite sports team?",
//   "What is your favorite vacation destination?",
// ];

const SignupForm = () => {
  const classes = useStyle();

  const { userState, dispatch } = useContext(SignUpContext);

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    dob: "",
    gender: "female",
    phoneNumber: { phoneNumber: '', error: false, errorMessage: "" },
    email: { email: "", error: false, errorMessage: "" },
    password: { password: "", error: false, errorMessage: "" },
    confirmPassword: { password: "", error: false, errorMessage: "" },
    address: "",
    country: { countryId: "", countryName: "" },
    state: { stateId: "", stateName: "" },
    qualification: "",
    profile: "",
    department: "",
    securityQuestion: "",
    securityAns: "",
  });
  const [stateData, setStateData] = useState([]);
  const [signupDisabled, setSignupDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newSignUpDetails = signUpDetails;

    const payload = {
      name: signUpDetails?.name,
      dob: signUpDetails?.dob,
      gender: signUpDetails?.gender,
      phoneNumber: signUpDetails?.phoneNumber?.phoneNumber,
      email: signUpDetails?.email?.email,
      password: signUpDetails?.confirmPassword?.password,
      address: signUpDetails?.address,
      country: signUpDetails?.country?.countryName,
      state: signUpDetails?.state?.stateName,
      qualification: signUpDetails?.qualification,
      profile: signUpDetails?.profile,
      department: signUpDetails?.department,
      securityQuestion: signUpDetails?.securityQuestion,
      securityAns: signUpDetails?.securityAns,
    };

    console.log("PAYLOAD :::: ", payload);
    dispatch({
      type: SignUpUserDetails,
      payload: payload,
    });

    const res = await Signup(payload);
    if (res?.status === 201) {
      //Show success msg - User registered successfully
      setShowSuccessBanner(true);
      //Redirect to Login Form
    }

    if (
      signUpDetails?.name === "" ||
      signUpDetails?.dob === "" ||
      signUpDetails?.gender === "" ||
      signUpDetails?.phoneNumber === "" ||
      signUpDetails?.email?.email === "" ||
      signUpDetails?.password === "" ||
      signUpDetails?.confirmPassword?.password === "" ||
      signUpDetails?.address === "" ||
      signUpDetails?.country === "" ||
      signUpDetails?.state === "" ||
      signUpDetails?.qualification === "" ||
      signUpDetails?.profile === "" ||
      signUpDetails?.department === "" ||
      signUpDetails?.securityQuestion === "" ||
      signUpDetails?.securityAns === ""
    ) {
      //   setSignupDisabled(true);
      //   setErrorMsg(true);
      // }else{
      //   setSignupDisabled(false);
      //   setErrorMsg(false);
      alert("All fields are  mandatory");
    }

    setSignUpDetails(newSignUpDetails);
    console.log(signUpDetails);
  };

  const handleCountrySelect = (e) => {
    let countryId = e?.target?.value;
    let nameOfCountry = "";
    locationData?.map((val) => {
      if (countryId === val?.countryId) {
        nameOfCountry = val?.country;
      }
    });
    setSignUpDetails({
      ...signUpDetails,
      country: {
        countryId: countryId,
        countryName: nameOfCountry,
      },
    });

    let stateList = locationData?.find(
      (country) => country?.countryId === countryId
    )?.state;
    setStateData(stateList);
  };

  const handleStateSelect = (e) => {
    let stateId = e?.target?.value;
    let stateList = locationData?.find(
      (country) => country?.country === signUpDetails?.country?.countryName
    )?.state;
    let stateName = stateList?.find(
      (state) => state?.stateId === stateId
    )?.stateName;
    console.log(stateName);

    setSignUpDetails({
      ...signUpDetails,
      state: {
        stateId: stateId,
        stateName: stateName,
      },
    });
  };

  const handlePhoneNumberChange = (e) => {
    let phoneNumber = e?.target?.value;

    if (signUpDetails?.phoneNumber?.phoneNumber && signUpDetails?.country?.countryId === "1") {
      if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
        signUpDetails.phoneNumber.error = true;
        signUpDetails.phoneNumber.errorMessage =
          "Please enter a valid phone number";
      } else {
        signUpDetails.phoneNumber.error = false;
        signUpDetails.phoneNumber.errorMessage = "";
      }
    } else if (signUpDetails?.phoneNumber?.phoneNumber && signUpDetails?.country?.countryId === "2") {
      if (!validator.isMobilePhone(phoneNumber, "en-US")) {
        signUpDetails.phoneNumber.error = true;
        signUpDetails.phoneNumber.errorMessage =
          "Please enter a valid phone number";
      } else {
        signUpDetails.phoneNumber.error = false;
        signUpDetails.phoneNumber.errorMessage = "";
      }
    } else if (signUpDetails?.phoneNumber?.phoneNumber && signUpDetails?.country?.countryId === "3") {
      if (!validator.isMobilePhone(phoneNumber, "en-CA")) {
        signUpDetails.phoneNumber.error = true;
        signUpDetails.phoneNumber.errorMessage =
          "Please enter a valid phone number";
      } else {
        signUpDetails.phoneNumber.error = false;
        signUpDetails.phoneNumber.errorMessage = "";
      }
    }

    setSignUpDetails({
      ...signUpDetails,
      phoneNumber: {
        ...signUpDetails?.phoneNumber,
        phoneNumber: e?.target?.value,
      },
    });
  };

  const handleEmailChange = (e) => {
    if (signUpDetails?.email?.email) {
      if (!validator.isEmail(signUpDetails.email.email)) {
        setSignupDisabled(true);
        signUpDetails.email.error = true;
        signUpDetails.email.errorMessage = "Please Enter a Valid Email Id";
      } else {
        setSignupDisabled(false);

        signUpDetails.email.error = false;
        signUpDetails.email.errorMessage = "";
      }
    }

    setSignUpDetails({
      ...signUpDetails,
      email: { ...signUpDetails?.email, email: e?.target?.value },
    });
  };

  const handlePasswordChange = (e) => {
    if (signUpDetails?.password?.password) {
      if (
        !validator.isStrongPassword(signUpDetails.password.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        signUpDetails.password.error = true;
        signUpDetails.password.errorMessage = "Entered password is not strong, include uppercase, number ,symbol and lowerCase";
      } else {
        signUpDetails.password.error = false;
        signUpDetails.password.errorMessage = "";
      }
    }

    setSignUpDetails({
      ...signUpDetails,
      password: {
        ...signUpDetails?.password,
        password: e?.target?.value,
      }
    })
  }

  const handleConfirmPassword = (e) => {
    let pwd = signUpDetails?.password?.password;
    let reEnteredPassword = e?.target?.value;
    if (pwd === reEnteredPassword) {
      setSignupDisabled(false);
      signUpDetails.confirmPassword.error = false;
      signUpDetails.confirmPassword.errorMessage = "";
    } else {
      setSignupDisabled(true);
      signUpDetails.confirmPassword.error = true;
      signUpDetails.confirmPassword.errorMessage = "Password does not match";
    }
    setSignUpDetails({
      ...signUpDetails,
      confirmPassword: {
        ...signUpDetails?.confirmPassword,
        password: e?.target?.value,
      },
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {errorMsg && <p>All fields are mandatory</p>}
      {!showSuccessBanner && (
        <Grid
          container
          rowSpacing={2}
          className={classes.gridStyle}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form
            autoComplete="off"
            className={classes.formStyle}
            onSubmit={handleSubmit}
          >
            <Grid className={classes.inputGridContainer}>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Full Name *</Typography>}
                  type="input"
                  variant="outlined"
                  value={signUpDetails?.name}
                  onChange={(e) =>
                    setSignUpDetails({ ...signUpDetails, name: e?.target?.value })
                  }
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Date Of Birth *</Typography>}
                  type="date"
                  variant="outlined"
                  value={signUpDetails?.dob}
                  onChange={(e) =>
                    setSignUpDetails({ ...signUpDetails, dob: e?.target?.value })
                  }
                  // required
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  inputProps={{
                    max: today,
                    min: "1920-01-01",
                  }}
                />
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <FormControl fullWidth className={classes.formControlStyle}>
                  <FormLabel id="gender">Gender *</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={(e) =>
                      setSignUpDetails({
                        ...signUpDetails,
                        gender: e?.target?.value,
                      })
                    }
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Address *</Typography>}
                  type="text"
                  variant="outlined"
                  value={signUpDetails?.address}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      address: e?.target?.value,
                    })
                  }
                  // required
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <FormControl fullWidth className={classes.formControlStyle}>
                  <FormLabel>Country *</FormLabel>
                  <Select
                    labelId="country"
                    value={signUpDetails?.country?.countryId}
                    onChange={handleCountrySelect}
                  >
                    {locationData?.map((val) => (
                      <MenuItem value={val?.countryId}>{val?.country}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <FormControl fullWidth className={classes.formControlStyle}>
                  <FormLabel>State *</FormLabel>
                  <Select
                    labelId="state"
                    value={signUpDetails?.state?.stateId}
                    onChange={handleStateSelect}
                  >
                    {stateData?.map((val) => (
                      <MenuItem value={val?.stateId}>{val?.stateName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Phone Number *</Typography>}
                  type="number"
                  variant="outlined"
                  value={signUpDetails?.phoneNumber?.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {signUpDetails?.country?.countryId === "1" ? "+91" : "+1"}
                      </InputAdornment>
                    ),
                  }}
                  error={signUpDetails.phoneNumber.error}
                  helperText={
                    signUpDetails.phoneNumber.error
                      ? signUpDetails.phoneNumber.errorMessage
                      : ""
                  }
                />
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Email *</Typography>}
                  type="email"
                  variant="outlined"
                  value={signUpDetails?.email?.email}
                  onChange={handleEmailChange}
                  // required
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  error={signUpDetails?.email?.error}
                  helperText={
                    signUpDetails?.email?.error
                      ? signUpDetails?.email?.errorMessage
                      : ""
                  }
                />
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Password *</Typography>}
                  type="password"
                  variant="outlined"
                  value={signUpDetails?.password?.password}
                  onChange={handlePasswordChange}
                  // onChange={(e) =>
                  //   setSignUpDetails({
                  //     ...signUpDetails,
                  //     password: e?.target?.value,
                  //   })
                  // }
                  // required
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  error={signUpDetails?.password?.error}
                  helperText={
                    signUpDetails?.password?.error
                      ? signUpDetails?.password?.errorMessage
                      : ""
                  }
                />
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Confirm Password *</Typography>}
                  type="password"
                  variant="outlined"
                  value={signUpDetails?.confirmPassword?.password}
                  onChange={handleConfirmPassword}
                  // onChange={(e) => setSignUpDetails({...signUpDetails, confirmPassword:e?.target?.value})}
                  // required
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  error={signUpDetails?.confirmPassword?.error}
                  helperText={
                    signUpDetails?.confirmPassword?.error
                      ? signUpDetails?.confirmPassword?.errorMessage
                      : ""
                  }
                />
              </Grid>

              <Grid item className={classes.gridRowStyle}>
                <FormControl fullWidth className={classes.formControlStyle}>
                  <FormLabel>Highest Qualification *</FormLabel>
                  <Select
                    labelId="qualification"
                    value={signUpDetails?.qualification}
                    onChange={(e) =>
                      setSignUpDetails({
                        ...signUpDetails,
                        qualification: e?.target?.value,
                      })
                    }
                  >
                    {qualificationData?.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <FormControl fullWidth className={classes.formControlStyle}>
                  <FormLabel>Profile *</FormLabel>
                  <Select
                    labelId="profile"
                    value={signUpDetails?.profile}
                    onChange={(e) =>
                      setSignUpDetails({
                        ...signUpDetails,
                        profile: e?.target?.value,
                      })
                    }
                  >
                    {profileData?.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item className={classes.gridRowStyle}>
                <FormControl fullWidth className={classes.formControlStyle}>
                  <FormLabel>Department *</FormLabel>

                  <Select
                    labelId="department"
                    value={signUpDetails?.department}
                    onChange={(e) =>
                      setSignUpDetails({
                        ...signUpDetails,
                        department: e?.target?.value,
                      })
                    }
                  >
                    {departmentData?.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <FormControl fullWidth className={classes.formControlStyle}>
                  <FormLabel>Security Question *</FormLabel>
                  <Select
                    labelId="securityQuestion"
                    value={signUpDetails?.securityQuestion}
                    onChange={(e) =>
                      setSignUpDetails({
                        ...signUpDetails,
                        securityQuestion: e?.target?.value,
                      })
                    }
                  >
                    {securityQuestionData?.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridRowStyle}>
                <TextField
                  label={<Typography>Security Answer *</Typography>}
                  type="text"
                  variant="outlined"
                  value={signUpDetails?.securityAns}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      securityAns: e?.target?.value,
                    })
                  }
                  margin="normal"
                  fullWidth
                  className={classes.inputFieldStyle}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item className={classes.gridRowStyle}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className='submitButton'
                disabled={signupDisabled}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      )}
      {showSuccessBanner && (
        <SuccessBanner text="User registered successfully" />
      )}
    </>
  );
};

export default SignupForm;
