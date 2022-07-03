import React, { useMemo, useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import WidgetSm from "../../components/WidgetSm/WidgetSm";

import { userData } from "../../shared/util/util";

import "./Home.scss";

const Home = () => {
  const token = useSelector((state) => state.auth.token);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setUserStats] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        let responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/stats`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        responseData = responseData.userStats.sort((a, b) => {
          return a._id - b._id;
        });
        // console.log(responseData);
        responseData.map((data) =>
          setUserStats((prevState) => [
            ...prevState,
            {
              name: MONTHS[data._id - 1],
              "New User": data.total,
            },
          ])
        );
      } catch (error) {}
    };
    fetchUserStats();
  }, [sendRequest, token, MONTHS]);
  return (
    <div className="home-container">
      <FeaturedInfo />
      {!isLoading && userStats && (
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="New User"
          className=""
        />
      )}
      <div className="home-widgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
