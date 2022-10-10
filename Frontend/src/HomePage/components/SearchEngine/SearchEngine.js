import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import SearchList from "../SearchList/SearchList";

import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchEngine.scss";

const SearchEngine = (props) => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [queryResult, setQueryResult] = useState({});
  const [formState, inputHandler] = useForm(
    {
      search: {
        value: "",
        isValid: true,
      },
    },
    false
  );
  const { value: inputValue, ref: inputRef } = formState.inputs.search;
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (inputValue === inputRef) {
          const responseMovieData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/movies?search=${inputValue}`,
            "GET",
            null,
            { Authorization: `Bearer ${token}` }
          );
          // console.log(responseMovieData);
          setQueryResult(responseMovieData);
        }
      } catch (error) {}
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [sendRequest, token, inputValue, inputRef]);

  const searchSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!inputValue) {
        return;
      }
      history.push(`/search?q=${inputValue}`);
    } catch (error) {}
  };
  return (
    <form className="searchForm-container" onSubmit={searchSubmitHandler}>
      <div className="searchView-container">
        <Input
          id="search"
          element="input"
          type="text"
          validators={[]}
          onInput={inputHandler}
          placeholder="Search"
          initialValue={formState.inputs.search.value}
          initialValid={formState.inputs.search.isValid}
        />
        {Object.keys(queryResult).length !== 0 &&
          formState.inputs.search.isFocus && (
            <SearchList
              resultList={queryResult}
              isLoading={isLoading}
              size="sml"
            />
          )}
        {/* {queryResult && <SearchList resultList={queryResult} />} */}
      </div>
      <Button className="btn-icon" type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default SearchEngine;
