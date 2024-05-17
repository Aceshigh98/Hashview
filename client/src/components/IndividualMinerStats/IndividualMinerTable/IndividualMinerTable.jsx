import React from "react";
import classes from "./IndividualMinerTable.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#828da2",
    textAlign: "center",
    width: "auto",
    fontSize: "x-large",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: "auto",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    borderBottom: "20px",
  },
}));

const IndividualMinerTable = ({ miner }) => {
  if (!miner || !miner.hashrateTable) {
    return <div>No data available</div>;
  }

  const renderNestedTable = (items) => (
    <Table size="small" sx={{ width: "auto" }}>
      <TableBody>
        {items.map((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell
              component="th"
              scope="row"
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                width: "auto",
                height: "auto",
                fontWeight: "bold",
                color: "#828da2",
              }}
            >
              Date: {item.date}
            </StyledTableCell>
            <StyledTableCell
              component="th"
              scope="row"
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                width: "auto",
                height: "auto",
                fontWeight: "bold",
              }}
            >
              Hashrate: {(item.value / 1e12).toFixed(2)} TH/s
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className={classes["table-container"]}>
      <TableContainer component={Paper} sx={{ zIndex: 2 }}>
        <Table
          sx={{
            maxWidth: "auto",
            width: "100%",
            height: 250,
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Daily Hashrate</StyledTableCell>
              <StyledTableCell>Weekly Hashrate</StyledTableCell>
              <StyledTableCell>Monthly Hashrate</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>
                {renderNestedTable(miner.hashrateTable.daily)}
              </StyledTableCell>
              <StyledTableCell>
                {renderNestedTable(miner.hashrateTable.weekly)}
              </StyledTableCell>
              <StyledTableCell>
                {renderNestedTable(miner.hashrateTable.monthly)}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IndividualMinerTable;
