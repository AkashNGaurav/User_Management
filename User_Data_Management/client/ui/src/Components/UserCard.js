import React, { useState, useContext } from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import AccountCircle from "@mui/icons-material/AccountCircle";
import { UsersDetailsContext, SearchContext } from '../Context/Provider';
import { makeStyles } from "@mui/styles";
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const useStyle = makeStyles({
  cardContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: "10px",
    // paddingLeft: '10% !important',
    border: "1px solid #ccc",
    borderRadius: "8px",
    margin: "10px",
    boxShadow: "5px 5px 2px #ccc",
    cursor: "pointer",
  },
  profileCard: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '14px',
    color: '#5c5c5e',
    '& svg': {
      width: '15px'
    }
  },
  userCardContainer: {
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: "2px 2px 2px #ccc",
    height: '40vh',
    overflowY: 'scroll',
    backgroundColor: '#fff',
  }
})

const UserCard = () => {
  const classes = useStyle();
  const { state } = useContext(UsersDetailsContext);
  const { searchState, searchedValue } = useContext(SearchContext);

  const handleUserCardClick = (username) => {
    searchedValue({ ...searchState, data: username, showUserProfile: true });
  }

  return (
    <Grid item className={classes.userCardContainer}>
      {state?.filteredUsers?.map((val) => (

        <Card key={val?.id} onClick={() => handleUserCardClick(val?.username)} style={{boxShadow: 'none'}}>
          <CardContent className={`sideNavBackgroundColor ${classes.cardContainer}`}>
            <Grid item marginTop={0.5}>
              <AccountCircle />
            </Grid>
            <Grid textAlign='left' marginLeft={2} >
              <Typography variant='h6'> {val?.username}</Typography>
              {val?.profile?.profile_name && <Typography variant='p' display='flex' alignItems='center' className={classes.profileCard}><AssignmentIndIcon style={{ marginRight: '5px' }} />{val?.profile?.profile_name}</Typography>}
              <Typography variant='p' display='flex' alignItems='center' className={classes.profileCard}><EmailIcon style={{ marginRight: '5px' }} />{val?.email_id}</Typography>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Grid>
  )
}

export default UserCard