import React, { Fragment, useEffect } from "react";
import { listsAction } from "../../shared/store/lists";
import { useSelector, useDispatch } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, AddCircle } from "@mui/icons-material";

import Button from "../../shared/components/UI/Button/Button";
import "./List.scss";

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(responseData.lists);
        dispatch(listsAction.setLists(responseData.lists));
      } catch (error) {}
    };
    fetchList();
  }, [sendRequest, token, dispatch]);

  const handleDelete = async (id) => {
    try {
      const deleteList = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/lists/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(listsAction.deleteListById(id));
      console.log(deleteList);
    } catch (error) {}
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "title",
      headerName: "Title",
      width: 350,
    },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "content", headerName: "Content", width: 300 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              className="btn-status"
              to={{
                pathname: `/lists/${params.row._id}`,
                list: params.row,
              }}
              edit
            ></Button>
            <DeleteOutline
              className="productList-delete-btn"
              onClick={() => handleDelete(params.row._id)}
            />
          </Fragment>
        );
      },
    },
  ];

  return (
    <div className="productList-container">
      <div className="movie-btn-container">
        <Button to="/lists/new" className=" btn-icon">
          <AddCircle className="item-icon" />
          New Movie List
        </Button>
      </div>
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        className="productList-table"
        getRowId={(r) => r._id}
      />
    </div>
  );
};

export default List;
