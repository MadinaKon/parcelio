import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function preventDefault(event) {
  event.preventDefault();
}

export default function TableOverview({ data }) {
  return (
    <React.Fragment>
      <title>Table overview page</title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>From city</TableCell>
            <TableCell>To city</TableCell>
            <TableCell>Flight Date time</TableCell>
            <TableCell>Available kilos</TableCell>
            <TableCell>Phone number</TableCell>

            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.fromCity}</TableCell>
              <TableCell>{row.toCity}</TableCell>
              <TableCell>{row.flightDateTime}</TableCell>
              <TableCell>{row.availableKilos}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell> */}
              {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
