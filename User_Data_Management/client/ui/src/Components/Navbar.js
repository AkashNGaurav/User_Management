import React, { useState, useContext, useRef, useEffect } from "react";
import {
  AppBar,
  Box,
  Typography,
  InputBase,
  Toolbar,
  IconButton,
  Menu,
  Grid,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { SearchContext, UsersDetailsContext } from "../Context/Provider";
import { LogoutAPI } from "../Services/ApiServices";
import userDataLogo from "../images/udcLogo.png";
import LogoutIcon from '@mui/icons-material/Logout';

const useStyle = makeStyles({
  gridStyle: {
    '& header': {
      backgroundColor: '#00183D',
    }
  },
  gridItemStyle: {
    '& input': {
      paddingLeft: '0px !important'
    }
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',

  },
  heading: {
    transition: 'all 0.6s cubiz-bezier(0.68,-0.55,0.265,1.55)',
    fontSize: '30px !important',
    fontWeight: '600 !important',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: '40px !important',
      marginRight: '10px'
    }
  },
  suggestionListContainer: {
    width: '100%',
    position: 'absolute',
    top: '25px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '5px',
    paddingLeft: '0px',
    background: '#E5E5E5',
    boxShadow: '4px 4px 4px #888888',
    listStyle: 'none',
    '& li': {
      textAlign: 'left',
      cursor: 'pointer',
      padding: '10px 30px 10px 30px',
      '&:hover': {
        backgroundColor: '#FFAD7E',
        color: 'white'
      }
    }
  },
  menuContainer: {
    '& p': {
      cursor: 'pointer',
      padding: '5px 30px 5px 30px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#FFAD7E',
        color: 'white'
      }
    }
  }
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "80ch",
      "&:focus": {
        width: "80ch",
      },
    },
  },
}));

const Navbar = () => {
  const classes = useStyle();
  const { searchState, searchedValue } = useContext(SearchContext);

  const { state } = useContext(UsersDetailsContext);
  const [anchorEl, setAnchorEl] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const suggestionListRef = useRef(null);

  const handleClickOutside = (event) => {
    if (suggestionListRef.current && showSuggestions && !suggestionListRef.current.contains(event.target)) {
      console.log(suggestionListRef, event.target);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showSuggestions]);

  const handleSearch = (e) => {
    searchedValue({ ...searchState, data: e?.target?.value });
    setSuggestionsList(state?.data?.filter((val) => val?.username?.toLowerCase().startsWith(e?.target?.value?.toLowerCase())));
    setShowSuggestions(true);
  };

  const handleSelectedUser = (username) => {
    searchedValue({ ...searchState, data: username, showUserProfile: true });
    setShowSuggestions(false);
    console.log("SEARCH :: ", searchState)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const payload = {
      access_token: localStorage?.getItem("access_token"),
    }
    const res = await LogoutAPI(payload)
    localStorage?.removeItem("access_token");
    localStorage?.removeItem("Username");
    window.location.href = "/login";
  };

  return (
    <Grid container spacing={0} direction="row"
      justifyContent="flex-start"
      alignItems="flex-start" className={classes.gridStyle}>
      <AppBar position="sticky">
        <Toolbar>
          <Grid item xs={5} md={3} className={classes.gridItemStyle}>
            <Typography variant="h6" component="div" noWrap className={classes?.heading}>
              <img src={userDataLogo} alt='UserDaraCentralLogo' /><strong>User<span style={{ color: '#FF7425' }}>Data</span>Center</strong>
            </Typography>
          </Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item sx={3} md={3} className={classes.gridItemStyle} style={{ width: '23%', position: 'relative' }} >
            <Search className={classes.searchContainer}>
              <SearchIconWrapper style={{ position: 'static' }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchState?.data}
                onChange={handleSearch}
                autoComplete="true"
              />
              {showSuggestions && (
                <ul className={classes.suggestionListContainer} ref={suggestionListRef}>
                  {suggestionsList?.length !== 0 ? suggestionsList?.map((val) => (
                    <li key={val?.id} onClick={() => handleSelectedUser(val?.username)}>{val?.username}</li>
                  )) : (<li key="404">No user found</li>)}
                </ul>
              )}
            </Search>
          </Grid>
          <Grid item xs={1} md={1} className={classes.gridItemStyle}>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Grid item className={classes.menuContainer}>
                  <Typography style={{cursor:"auto"}}>{localStorage.getItem("Username")}</Typography>
                  <Typography onClick={handleLogout}><LogoutIcon style={{ paddingRight: '5px', paddingBottom:'0px ' }} />Logout</Typography>
                </Grid>
              </Menu>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;