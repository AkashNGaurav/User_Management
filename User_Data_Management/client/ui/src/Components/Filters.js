import React, { useContext } from "react";
import {
  FormControl,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FiltersContext } from "../Context/Provider";
import { timeFrameValues, locationValues } from "../Constants/data";

const useStyle = makeStyles({
  gridStyle: {
    backgroundColor: "white",
    boxShadow: '4px 4px 4px #888888',
    padding: '10px 40px 10px 40px',
    position: 'relative',
    zIndex: '1',
    textAlign: "left",
  },
  gridItemStyle: {
    paddingTop: "10px",
  },
  formControlStyle: {
    backgroundColor: "#ffffff",
    border: "none",
    borderRadius: "0%",
    '& label': {
      fontSize: '1.04rem !important',
    }
  }
});

const Filters = () => {
  const classes = useStyle();
  const { state, updatedFilters } = useContext(FiltersContext);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      className={classes.gridStyle}
    >
      <Grid item xs={2} md={2} >
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '18px' }}>Time Filter</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={state?.timeframe}
            onChange={(e) =>
              updatedFilters({ ...state, timeframe: e?.target?.value })
            }
            label="TimeFilter"
          >
            {timeFrameValues?.map((val) => (
              <MenuItem key={val?.value} value={val?.days}>{val?.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1} md={1}></Grid>
      <Grid item xs={2} md={2}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '18px' }}>Location Filter</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={state?.location}
            onChange={(e) =>
              updatedFilters({ ...state, location: e?.target?.value })
            }
            label="Location"
          >
            {locationValues?.map((val) => (
              <MenuItem key={val} value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
