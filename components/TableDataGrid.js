import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export default function TableDataGrid() {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          ...data.initialState,
          filter: {
            ...data.initialState?.filter,
            filterModel: {
              items: [
                {
                  field: "rating",
                  operator: ">",
                  value: "2.5",
                },
              ],
            },
          },
        }}
      />
    </div>
  );
}
