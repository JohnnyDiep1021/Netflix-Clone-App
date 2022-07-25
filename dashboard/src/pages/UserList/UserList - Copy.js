import React, { Fragment, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Button from "../../shared/components/UI/Button/Button";
import { userRows } from "../../shared/util/util";
import { DeleteOutline } from "@mui/icons-material";

import "./UserList.scss";

const UserList = () => {
  const [data, setData] = useState(userRows);
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        // console.log(params.row.avatar);
        return (
          <div className="userList-user">
            <img src={params.row.avatar} alt="" className="userList-img" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              className="btn-status "
              to={`/users/${params.row.id}`}
              edit
            ></Button>
            <DeleteOutline
              className="userList-delete-icon"
              onClick={() => handleDelete(params.row.id)}
            />
          </Fragment>
        );
      },
    },
  ];
  const handleDelete = (id) => {
    setData((prevState) => prevState.filter((data) => data.id !== id));
  };
  return (
    <div className="userList-container">
      {/* <div className="userList-table"> */}
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        // autoHeight
        className="userList-table"
      />
    </div>
    // </div>
  );
};

export default UserList;
