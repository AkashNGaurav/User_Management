import React, { useContext, useEffect, useState } from "react";
import { SearchContext, UsersDetailsContext } from "../Context/Provider";
import { TableBody, TableContainer, TableRow, Paper, Table } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const UserTable = () => {
  const { searchState } = useContext(SearchContext);
  const { state } = useContext(UsersDetailsContext);

  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    setSearchedData(
      state?.data?.filter(
        (val) => val?.username === searchState?.data
      )
    )
  }, [searchState]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // Format date in dd/mm/yyyy
  const formattedDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-GB");
  }

  return (
    <>
      <TableContainer component={Paper} style={{ width: "90%", margin: "auto", marginTop: "20px", boxShadow: "5px 5px 2px #ccc" }}>
        <Table >
          <TableBody>
            <StyledTableRow key="1">
              <StyledTableCell component="th" scope="row"><b>Name</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.username}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="10">
              <StyledTableCell component="th" scope="row"><b>Date of Birth</b></StyledTableCell>
              <StyledTableCell>{formattedDate(searchedData[0]?.date_of_birth)}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="6">
              <StyledTableCell component="th" scope="row"><b>Profile</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.profile?.profile_name}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="7">
              <StyledTableCell component="th" scope="row"><b>Department</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.department?.department_name}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="2">
              <StyledTableCell component="th" scope="row"><b>Date of Joining</b></StyledTableCell>
              <StyledTableCell>{formattedDate(searchedData[0]?.created_date)}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="3">
              <StyledTableCell component="th" scope="row"><b>Email</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.email_id}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="4">
              <StyledTableCell component="th" scope="row"><b>Contact Number</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.contact_number}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="9">
              <StyledTableCell component="th" scope="row"><b>Highest Qualification</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.qualification?.qualification_name}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="5">
              <StyledTableCell component="th" scope="row"><b>Address</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.address?.city}, {searchedData[0]?.address?.state}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow key="8">
              <StyledTableCell component="th" scope="row"><b>Country</b></StyledTableCell>
              <StyledTableCell>{searchedData[0]?.address?.country}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
