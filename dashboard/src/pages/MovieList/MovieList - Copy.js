import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moviesAction } from "../../shared/store/movies";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, AddCircle } from "@mui/icons-material";

import Button from "../../shared/components/UI/Button/Button";
import "./MovieList.scss";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/movies`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        // console.log(responseData.movies);
        dispatch(moviesAction.getMovies(responseData.movies));
      } catch (error) {}
    };
    fetchMovies();
  }, [sendRequest, token, dispatch]);

  const handleDelete = async (id) => {
    try {
      const deleteMovie = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/movies/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(deleteMovie);
      dispatch(moviesAction.deleteMovieById(id));
    } catch (error) {}
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "movie",
      headerName: "Movie",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="productList-item">
            <img
              className="productList-img"
              src={params.row.image.file}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "limit", headerName: "Limit", width: 150 },
    { field: "isSeries", headerName: "isSeries", width: 150 },
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
                pathname: `/movies/${params.row._id}`,
                movie: params.row,
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
        <Button to="/movies/new" className=" btn-icon">
          <AddCircle className="item-icon" />
          New Movie
        </Button>
      </div>
      <DataGrid
        rows={movies}
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

export default MovieList;
