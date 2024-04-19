import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./IndividualMinerTable.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CustomizedTable({ miners }) {
  return (
    <div className={classes["table-container"]}>
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: "auto", width: "100%", height: 250 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Daily Hashrate</StyledTableCell>
              <StyledTableCell>Weekly Hashrate</StyledTableCell>
              <StyledTableCell>Hourly Hashrate</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hashrates.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.value}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {hashrates.weekly[index]
                    ? hashrates.weekly[index].value
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {hashrates.hourly[index]
                    ? hashrates.hourly[index].value
                    : "N/A"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomizedTable;

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
