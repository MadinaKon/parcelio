import React from "react";
import styled from "styled-components";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import SenderForm from "./form/SenderForm.js";
import { useRouter } from "next/router";
import useSWR from "swr";

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "userName", headerName: "Username", width: 150 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
  { field: "fromCity", headerName: "From City", width: 150 },
  { field: "toCity", headerName: "To City", width: 150 },
  { field: "flightDateTime", headerName: "Flight Date Time", width: 200 },
  { field: "availableKilos", headerName: "Available Kilos", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      function handleContactButtonClick() {
        console.log("Contact button clicked for row:", params.row);
      }

      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleContactButtonClick}
        >
          Contact
        </Button>
      );
    },
  },
];

export default function DataGridComponent({ data }) {
  const router = useRouter();
  const { mutate } = useSWR("/api/senders");

  const getRowId = (data) => data._id;

  async function addSenderService(service) {
    const response = await fetch("/api/senders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });

    if (response.ok) {
      mutate();
    }

    router.push("/");
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={getRowId}
      />
      <Link href="/createService" passHref legacyBehavior>
        <FixedLink> Add service</FixedLink>
      </Link>

      <SenderForm onSubmit={addSenderService} formName={"add-sender-service"} />
    </div>
  );
}
