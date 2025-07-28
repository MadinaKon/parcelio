import * as React from "react";
import styled from "styled-components";
// import Link from "@mui/material/Link";
import Link from "next/link.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledLink } from "./StyledLink.js";

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

type TableOverviewRow = {
  _id: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  fromCity: string;
  toCity: string;
  flightDateTime: string;
  availableKilos: number;
  phoneNumber?: string;
  // paymentMethod?: string;
  // amount?: number;
};

// export default function TableOverview({ data }) {

export default function TableOverview({ data }: { data: TableOverviewRow[] }) {
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
            <TableCell>Flight Date</TableCell>
            <TableCell>Available kilos</TableCell>
            <TableCell>Phone number</TableCell>

            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: TableOverviewRow) => (
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

      {/* <Link href="/createService" passHref legacyBehavior>
        <FixedLink> Add service</FixedLink>
      </Link> */}

      <Link href="/createService" passHref legacyBehavior>
        <FixedLink> Add service</FixedLink>
      </Link>
    </React.Fragment>
  );
}
