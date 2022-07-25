import React from "react";

import Button from "../../shared/components/UI/Button/Button";

import "./WidgetLg.scss";

const WidgetLg = () => {
  return (
    <div className="widgetLg-container">
      <h3 className="widgetLg-title">Latest transaction</h3>
      <table className="widgetLg-table">
        <thead>
          <tr className="widgetLg-row">
            <th className="widgetLg-header">Customer</th>
            <th className="widgetLg-header">Date</th>
            <th className="widgetLg-header">Amount</th>
            <th className="widgetLg-header">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="widgetLg-row">
            <td className="widgetLg-user">
              <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="widgetLg-img"
              />
              <span className="widgetLg-name">Johnny Diep</span>
            </td>
            <td className="widgetLg-date">2 Jun 2021</td>
            <td className="widgetLg-amount">$122.00</td>
            <td className="widgetLg-status-btn">
              <Button className="btn-status" approved></Button>
            </td>
          </tr>
          <tr className="widgetLg-row">
            <td className="widgetLg-user">
              <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="widgetLg-img"
              />
              <span className="widgetLg-name">Johnny Diep</span>
            </td>
            <td className="widgetLg-date">2 Jun 2021</td>
            <td className="widgetLg-amount">$122.00</td>
            <td className="widgetLg-status-btn">
              <Button className="btn-status" approved></Button>
            </td>
          </tr>
          <tr className="widgetLg-row">
            <td className="widgetLg-user">
              <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="widgetLg-img"
              />
              <span className="widgetLg-name">Johnny Diep</span>
            </td>
            <td className="widgetLg-date">2 Jun 2021</td>
            <td className="widgetLg-amount">$122.00</td>
            <td className="widgetLg-status-btn">
              <Button className="btn-status" approved></Button>
            </td>
          </tr>
          <tr className="widgetLg-row">
            <td className="widgetLg-user">
              <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="widgetLg-img"
              />
              <span className="widgetLg-name">Johnny Diep</span>
            </td>
            <td className="widgetLg-date">2 Jun 2021</td>
            <td className="widgetLg-amount">$122.00</td>
            <td className="widgetLg-status-btn">
              <Button className="btn-status" approved></Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
