import React, { Fragment } from "react";

import { DataGrid } from "@mui/x-data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../shared/util/util";
import { useState } from "react";

import Button from "../../shared/components/UI/Button/Button";
import "./ProductList.scss";

const ProductList = () => {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="productList-item">
            <img className="productList-img" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              className="btn-status "
              to={`/products/${params.row.id}`}
              edit
            ></Button>
            <DeleteOutline
              className="productList-delete-btn"
              onClick={() => handleDelete(params.row.id)}
            />
          </Fragment>
        );
      },
    },
  ];

  return (
    <div className="productList-container">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        className="productList-table"
      />
    </div>
  );
};

export default ProductList;
