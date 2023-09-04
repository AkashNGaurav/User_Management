import React, { useState, useContext, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import {
  DrillDownGraphContext,
  FiltersContext,
  SearchContext,
  UsersDetailsContext,
} from "../Context/Provider";
import Navbar from "../Components/Navbar";
import Cards from "../Components/Cards";
import UserCard from "../Components/UserCard";
import PieChart from "../Components/Charts/PieChart";
import Filters from "../Components/Filters";
import BarGraph from "../Components/Charts/BarGraph";
import DrillDownBarGraph from "../Components/Charts/DrillDownBarGraph";
import UserTable from "../Components/UserTable";
import { locationData } from "../Constants/data";
import { makeStyles } from "@mui/styles";

const useStyle=makeStyles({
  chartContaianer:{
    borderRadius:'10px',
  },
  userCardHeader:{
    // transitionDelay: 'var(--delay-out)',
    color:'#5c5c5e',
    transition: 'all 0.6s cubiz-bezier(0.68,-0.55,0.265,1.55)',
    fontSize:'17px !important',
    // border: '1px solid #ccc',
    color: "#1976D2",
    paddingBottom: '0px !important',
    fontWeight: "bold !important",
    // paddingTop: '10px'
    // backgroundColor: "#ccc",
  }
})

const Home = () => {
  // const state = useContext(UsersDetailsContext);
  const classes=useStyle();
  const { state, updatedUserData } = useContext(UsersDetailsContext);
  const filtersContext = useContext(FiltersContext);
  const { searchState, searchedValue } = useContext(SearchContext);
  const {drillDownState, locationBarGraphFilterHandler} = useContext(DrillDownGraphContext);
  // console.log("CONTEXT ===> ", state);
  // console.log("FILTERS CONTEXT ===> ", filtersContext);
  // console.log("STATE =====>>>> ",drillDownState);

  const [departmentDistributionData, setDepartmentDistributionData] = useState(
    []
  );
  const [profileDistributionData, setProfileDistributionData] = useState([]);
  const [genderDistributionData, setGenderDistributionData] = useState([]);
  const [countryLocationData, setCountryLocationData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [stateData, setStateData] = useState([]);


  // Calculate users data based on filters
  const filteredData = () => {
    let timeframeFilteredUserList = state?.data?.filter((val) =>
      getNewUserCount(val?.created_date, filtersContext?.state?.timeframe)
    );
    if (filtersContext?.state?.location !== "All") {
      let filteredUsersList = timeframeFilteredUserList?.filter(
        (val) => val?.address?.country === filtersContext?.state?.location
      );
      // setFilteredUserData(filteredUsersList);
      updatedUserData({ ...state, filteredUsers: filteredUsersList });
    } else {
      // setFilteredUserData(timeframeFilteredUserList);
      updatedUserData({ ...state, filteredUsers: timeframeFilteredUserList });
    }
  };

  // Function to calculate newly registered users
  function getNewUserCount(registrationDate, days) {
    var today = new Date();
    var registerDate = new Date(registrationDate);

    var difference = today.getTime() - registerDate.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    return totalDays <= days;
  }

  // Calculate Department Distribution Data
  const calculateDepartmentData = () => {
    let data = [];
    let departmentData = {};
    state?.filteredUsers?.map((val) => {
      if (departmentData[val?.department?.department_name]) {
        departmentData[val?.department?.department_name] =
          departmentData[val?.department?.department_name] + 1;
      } else {
        departmentData[val?.department?.department_name] = 1;
      }
    });

    // Converting data in format suitable for making charts : [{'category': '', 'value': ''}]
    Object?.keys(departmentData)?.map((val) => {
      data.push({
        category: val,
        value: departmentData[val],
      });
    });
    setDepartmentDistributionData(data);
  };

  //Calculate Profile Distribution Data
  const calculateProfileData = () => {
    let data = [];
    let profileData = {};
    state?.filteredUsers?.map((val) => {
      if (profileData[val?.profile?.profile_name]) {
        profileData[val?.profile?.profile_name] =
          profileData[val?.profile?.profile_name] + 1;
      } else {
        profileData[val?.profile?.profile_name] = 1;
      }
    });

    // Converting data in format suitable for making charts : [{'category': '', 'value': ''}]
    Object?.keys(profileData)?.map((val) => {
      data.push({
        category: val,
        value: profileData[val],
      });
    });
    setProfileDistributionData(data);
  };

  // Calculate Gender Distribution Data
  const calculateGenderDistributionData = () => {
    let data = [];
    let genderDataObj = {};
    state?.filteredUsers?.map((val) => {
      if (genderDataObj[val?.gender]) {
        genderDataObj[val?.gender] = genderDataObj[val?.gender] + 1;
      } else {
        genderDataObj[val?.gender] = 1;
      }
    });

    // Converting data in format suitable for making charts : [{'category': '', 'value': ''}]
    Object?.keys(genderDataObj)?.map((val) => {
      data.push({
        category: val,
        value: genderDataObj[val],
      });
    });

    setGenderDistributionData(data);
  };

  // Calculating data for location vs no of users bar graph
  const calculateLocationDistributionData = () => {
    let data = [];
    let countryLocationDataObj = {};
    state?.filteredUsers?.map((val) => {
      if (countryLocationDataObj[val?.address?.country]) {
        countryLocationDataObj[val?.address?.country] =
          countryLocationDataObj[val?.address?.country] + 1;
      } else {
        countryLocationDataObj[val?.address?.country] = 1;
      }
    });

    // Converting data in format suitable for making bar graph
    Object?.keys(countryLocationDataObj)?.map((val) => {
      data.push({
        country: val,
        value: countryLocationDataObj[val],
      });
    });
    setCountryLocationData(data);
  };

  // Calculating data for state vs no of users bar graph
  const calculateStateDistributionData = () => {
    let data = [];
    let dataObj= {};
    let country = '';
    let stateList = [];

    if(drillDownState?.locationBarGraphFilter){
      country = drillDownState?.locationBarGraphFilter;
      stateList = locationData?.filter((val) => val?.country === country)[0].state;
    }
    
    state?.filteredUsers?.map((val) => {
      if (dataObj[val?.address?.state]) {
        dataObj[val?.address?.state] =
          dataObj[val?.address?.state] + 1;
      } else {
        dataObj[val?.address?.state] = 1;
      }
    });

    
    // Converting data in format suitable for making bar graph
    for (let stateObj of stateList) {
      let stateName = stateObj.stateName;
  
      if (dataObj.hasOwnProperty(stateName)) {
        const value = dataObj[stateName];
        data.push({ "country":stateName, "value": value });
      }
    }

    setStateData(data);
  }

  // Calculating data for qualification vs no of users bar graph
  const calculateQualificationDistributionData = () => {
    let data = [];
    let qualificationDataObj = {};
    state?.filteredUsers?.map((val) => {
      if (qualificationDataObj[val?.qualification?.qualification_name]) {
        qualificationDataObj[val?.qualification?.qualification_name] =
          qualificationDataObj[val?.qualification?.qualification_name] + 1;
      } else {
        qualificationDataObj[val?.qualification?.qualification_name] = 1;
      }
    });

    // Converting data in format suitable for making bar graph
    Object?.keys(qualificationDataObj)?.map((val) => {
      data.push({
        country: val,
        value: qualificationDataObj[val],
      });
    });
    setQualificationData(data);
  };

  useEffect(() => {
    filteredData();
  }, [state?.data, filtersContext]);

  useEffect(() => {
    calculateDepartmentData();
    calculateProfileData();
    calculateGenderDistributionData();
    calculateLocationDistributionData();
    calculateQualificationDistributionData();
    calculateStateDistributionData();
  }, [state?.filteredUsers, drillDownState]);
  
  useEffect( () => {
    if (!localStorage?.getItem("access_token")){
       window.location.href = '/login'
    }
  }, []);
  return (
    <div style={{width:"100%", height:"100vh", overflowX:"hidden", backgroundColor: "#f0f0f0"}}>
      <Navbar />

      {!searchState?.showUserProfile && <Filters />}

      <Grid container spacing={2}>
        <Grid item xs={3} md={3} marginTop={2}  height='auto'>
          {/* <Grid container spacing={2} marginTop='4%'>
        <Grid item xs={3} md={3}  position='fixed' > */}
          <Grid container spacing={2} rowSpacing={2} >
            <Grid item xs={12} md={12} margin='0px 10px 1px 9px'>
              <Cards
                title="Total number of users"
                value={state?.data?.length}
                // className="sideNavBackgroundColor"
              />
            </Grid>
            <Grid item xs={12} md={12} margin='0px 10px 1px 9px'>
              <Cards
                title="Number of newly registered users"
                value={state?.filteredUsers?.length}
                // className="sideNavBackgroundColor"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            rowSpacing={2}
            style={{ backgroundColor: "#f0f0f0" }}
            // className="sideNavBackgroundColor"
            paddingTop={2}
            paddingLeft={2}
            paddingRight={1}
            marginBottom={1}
          >
            <Grid item xs={12} md={12}>
              <Typography textAlign='left' paddingLeft={2} fontSize={20} className={classes.userCardHeader} paddingBottom={1}>List of Users</Typography>
              <UserCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9} md={9} style={{ backgroundColor: "#f0f0f0" }}>
         
          {!searchState?.showUserProfile && (
            <>
              <Grid container spacing={2} paddingRight={"20px"}>
                <Grid item xs={4} md={4}>
                  <PieChart
                    data={genderDistributionData}
                    id="genderPieChart"
                    title="Gender Distribution"
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <PieChart
                    data={departmentDistributionData}
                    id="departmentPieChart"
                    title="Departmental Distribution"
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <PieChart
                    data={profileDistributionData}
                    id="profilePieChart"
                    title="Profile Distribution"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} paddingRight={"20px"}>
                <Grid item sx={6} md={6}>
                  {drillDownState?.showCountryGraph && <DrillDownBarGraph
                    id="BarGraph1"
                    data={countryLocationData}
                    title="Demographic Distribution"
                  />}
                  {!drillDownState?.showCountryGraph && 
                  <BarGraph
                    id="BarGraph_state"
                    data={stateData}
                    title="State Distribution"
                  />
                  }
                </Grid>
                <Grid item sx={6} md={6}>
                  <BarGraph
                    id="BarGraph2"
                    data={qualificationData}
                    title="Qualification Distribution"
                  />
                </Grid>
              </Grid>
            </>
          )}
          {searchState?.showUserProfile && (
            <Grid container>
              <Grid item xs={9} md={9}></Grid>
              <Grid item xs={3} md={3} style={{paddingRight:"20px"}}>
                <Button
                  onClick={() =>
                    searchedValue({
                      ...searchState,
                      data: "",
                      showUserProfile: false,
                    })
                  }
                >
                  Return to dashboard
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <UserTable />
              </Grid>
            </ Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
