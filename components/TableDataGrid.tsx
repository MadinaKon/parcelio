import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link.js";
import { StyledLink } from "./StyledLink.js";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import SenderForm from "./form/SenderForm.js";
import BasicModal from "./modal/BasicModal.js";
import { useSession } from "next-auth/react";
import TransporterForm from "./form/TransporterForm.js";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

type Props = {
  data: Array<Record<string, any>>;
};

export default function DataGridComponent({ data }: Props) {
  const { data: session } = useSession();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (session) {
      setColumns([
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "userName", headerName: "Username", width: 150 },
        { field: "phoneNumber", headerName: "Phone Number", width: 150 },
        { field: "fromCity", headerName: "From City", width: 150 },
        { field: "toCity", headerName: "To City", width: 150 },
        { field: "flightDateTime", headerName: "Flight Date", width: 200 },
        { field: "availableKilos", headerName: "Available Kilos", width: 150 },
        {
          field: "actions",
          headerName: "Actions",
          width: 230,
          renderCell: (params) => renderActionsCell(params, session),
        },
      ]);
    } else {
      setColumns([
        { field: "fromCity", headerName: "From City", width: 150 } as GridColDef,
        { field: "toCity", headerName: "To City", width: 150 } as GridColDef,
        { field: "flightDateTime", headerName: "Flight Date", width: 200 } as GridColDef,
        { field: "availableKilos", headerName: "Available Kilos", width: 150 } as GridColDef,
        {
          field: "actions",
          headerName: "Actions",
          width: 230,
          renderCell: (params: GridRenderCellParams) => renderActionsCell(params, session),
        } as GridColDef,
      ]);
    }
  }, [session]);

  const renderActionsCell = (params, session) => {
    return (
      <BasicModal id={params.row._id}>
        {session ? (
          <TransporterForm
            formName={"update-service"}
            defaultData={params.row}
            id={params.row._id}
          />
        ) : (
          <SenderForm
            formName={"add-sender-service"}
            defaultData={params.row}
            serviceId={params.row._id}
            transporterId={params.row.userId[0]}
          />
        )}
      </BasicModal>
    );
  };

  const handleButtonClick = (event) => {
    if (!session) {
      event.preventDefault();
    }
  };

  const getRowId = (data) => data._id;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
      />

      <Link href="/createService" passHref legacyBehavior>
        <a onClick={handleButtonClick}>
          {session ? (
            <FixedLink> Add service</FixedLink>
          ) : (
            <Tooltip
              title="Add service is available only for logged-in users"
              arrow
            >
              <span>
                <Button variant="contained" color="primary" disabled>
                  Add service
                </Button>
              </span>
            </Tooltip>
          )}
        </a>
      </Link>
    </div>
  );
}
