import React from "react";
 import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { formatDate } from "../utils/date";

const TrackerTable = ({ rows, columns, onDelete }) => (
  <TableContainer component={Paper} variant="outlined">
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          {columns.map((column) => (
            <TableCell key={column.key}>{column.label}</TableCell>
          ))}
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length + 2}>
              <Typography color="text.secondary">No entries yet.</Typography>
            </TableCell>
          </TableRow>
        )}
        {rows.map((row) => (
          <TableRow key={row._id} hover>
            <TableCell>{formatDate(row.date)}</TableCell>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.render ? column.render(row) : row[column.key]}</TableCell>
            ))}
            <TableCell align="right">
              <Tooltip title="Delete">
                <IconButton color="error" onClick={() => onDelete(row._id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TrackerTable;
