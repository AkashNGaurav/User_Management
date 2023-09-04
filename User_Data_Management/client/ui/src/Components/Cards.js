import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { UsersDetailsContext } from "../Context/Provider";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  cardBody: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "5px 5px 2px #ccc !important",
    marginTop: "8px",
    backgroundColor: "#fff",
    marginLeft: "6px"
  },
  cardContainer: {
    borderRadius: "5px",
    // border: "1px solid #ccc",
    // boxShadow: "5px 5px 2px #ccc",
    "& h6": {
      fontSize: "1rem",
    },
    "& span": {
      fontSize: "1.8rem",
    },
  },
});

const Cards = ({ title, value, logo }) => {
  const classes = useStyle();
  return (
    <>
      <Card className={classes.cardBody}>
        <CardContent
          className={`sideNavBackgroundColor ${classes.cardContainer}`}
        >
          {/* <CardContent className={`sideNavBackgroundColor ${classes.cardContainer}`}> */}
          <Typography variant="h6">{title}</Typography>
          <Typography variant="p">{value}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Cards;
