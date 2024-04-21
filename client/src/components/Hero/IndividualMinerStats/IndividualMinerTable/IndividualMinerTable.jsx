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

const IndividualMinerTable = ({ miner }) => {
  if (!miner || !miner.revenueTable) {
    return <div>No data available</div>;
  }

  const renderNestedTable = (items) => (
    <Table size="large">
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
                fontSize: "x-large",
                fontWeight: "bold",
              }}
            >
              Date: {item.date}
              <br />
              Hashrate: {(item.value / 1e12).toFixed(2)} TH/s
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className={classes["table-container"]}>
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: "auto", width: "100%", height: 250 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{
                  textAlign: "center",
                  width: "auto",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                Daily Hashrate
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  textAlign: "center",
                  width: "auto",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                Weekly Hashrate
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  textAlign: "center",
                  width: "auto",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                Monthly Hashrate
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>
                {renderNestedTable(miner.revenueTable.daily)}
              </StyledTableCell>
              <StyledTableCell>
                {renderNestedTable(miner.revenueTable.weekly)}
              </StyledTableCell>
              <StyledTableCell>
                {renderNestedTable(miner.revenueTable.monthly)}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IndividualMinerTable;
