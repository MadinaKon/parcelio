import React from "react";
import styled from "styled-components";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import SenderForm from "./form/SenderForm.js";
import { useRouter } from "next/router";
import useSWR from "swr";
import BasicModal from "./modal/BasicModal.js";
import { useSession } from "next-auth/react";
import TransporterForm from "./form/TransporterForm.js";

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

export default function DataGridComponent({ data }) {
  const router = useRouter();
  // const { mutate } = useSWR("/api/packages");
  const { data: service, mutate } = useSWR("/api/packages");
  const { data: session } = useSession();

  // console.log("DATA DataGridComponent ", data);

  const handleContactButtonClickWrapper = (openSenderRequest, row) => {
    return () => {
      console.log("handleContactButtonClickWrapper row:", row._id);
      openSenderRequest(row);
    };
  };

  async function openSenderRequest(request) {
    const response = await fetch("/api/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      mutate();
    }

    router.push("/");
  }

  // async function updateService() {
  //   const response = await fetch(`/api/services`, {
  //     // TODO PATCH or PUT?
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(service),
  //   });
  //   if (response.ok) {
  //     mutate();
  //   }
  //   router.push("/");
  // }
  async function updateService(id) {

    console.log(id);

    const findObjectById = (array, id) => {
      array.find(function (obj) {
        

        //if (obj._id === id) {
          console.log('obj: ', obj);
        //}
      });

      return array.find((obj) => obj._id === id);
    };

    const foundObject = findObjectById(service, id);
    //console.log('id: ', id);
    // console.log("FOUND OBJECT ", foundObject);

    // console.log(JSON.stringify(service));

    const response = await fetch(`/api/services/${id}`, {
      // TODO PATCH or PUT?
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foundObject),
    });

    if (response.ok) {
      mutate();
    }

    router.push("/");
  }

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
        return (
          <>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleContactButtonClickWrapper(
                openSenderRequest,
                params.row._id
              )}
            >
              Contact
            </Button> */}
            <BasicModal>
              {session ? (
                <TransporterForm
                  // onSubmit={updateService}
                  onSubmit={() => updateService(params.row._id)}
                  formName={"update-service"}
                  defaultData={params.row}
                />
              ) : (
                <SenderForm
                  onSubmit={openSenderRequest}
                  formName={"add-sender-service"}
                  defaultData={params.row}
                  onClick={handleContactButtonClickWrapper(
                    openSenderRequest,
                    params.row
                  )}
                />
              )}
            </BasicModal>
          </>
        );
      },
    },
  ];

  const getRowId = (data) => data._id;

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
    </div>
  );
}
