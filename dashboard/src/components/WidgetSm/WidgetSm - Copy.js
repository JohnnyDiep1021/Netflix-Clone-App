import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import Button from "../../shared/components/UI/Button/Button";
import { Visibility } from "@mui/icons-material";
import "./WidgetSm.scss";

const WidgetSm = () => {
  const token = useSelector((state) => state.auth.token);
  const [newUsers, setNewUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchNewUser = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users?new=true`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(responseData.users);
      setNewUsers(responseData.users);
    };
    fetchNewUser();
  }, [sendRequest, token]);
  return (
    <div className="widgetSm-container">
      <span className="widgetSm-title">New Join Members</span>
      <ul className="widgetSm-list">
        {!isLoading &&
          newUsers &&
          newUsers.map((newUser) => (
            <li className="widgetSm-list-item" key={newUser._id}>
              <img
                src={
                  newUser.profilePic ||
                  `https://i.pinimg.com/originals/b4/0f/9f/b40f9f8fc0fb88aabf2a8acbc39c0ac0.png`
                }
                alt=""
                className="widgetSm-img"
              />
              <div className="widgetSm-user">
                <span className="widgetSm-username">{newUser.username}</span>
                <span className="widgetSm-usertitle">Web Developer</span>
              </div>
              <Button className="widgetSm-btn">
                <Visibility className="widgetSm-btn-icon" />
                Display
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
