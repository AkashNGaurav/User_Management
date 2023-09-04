import React from 'react';
import { Button, Typography, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  successBannerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column !important',
    gap: '15px',
    padding: '50px',
    '& p': {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif !important',
      fontWeight: '540 !important',
      fontize: '0.875rem !important',
      lineHeight: '1.75 !important',
      textAlign: 'left'
    },
    '& button': {
      color: '#fff !important',
      background: 'blue !important',
      boxShadow: '4px 4px 4px #7B7B7B',
      borderRadius: '0px',
      fontSize: '18px !important',
      fontWeight: '500 !important',
      textAlign: 'center !important',
      lineHeight: '28px !important',
      cursor: 'pointer !important',
      zIndex: '1 !important',
      width: '50% !important',
      textTransform: 'capitalize !important',
      transition: 'all 0.6s ease !important',
    }
  }
})

const SuccessBanner = ({ text }) => {
  const classes = useStyle();
  return (
    <Dialog open='true'>
      <Grid container className={classes.successBannerContainer} >
        <CheckCircleIcon color="success" fontSize='large' />
        <Typography variant='h5'>{text}</Typography>
        <Button onClick={(e) => window.location.href = "/login"} >Login now</Button>
      </Grid>
    </Dialog>
  )
}

export default SuccessBanner