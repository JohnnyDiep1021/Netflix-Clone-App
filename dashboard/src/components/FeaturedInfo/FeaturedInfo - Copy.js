import React from "react";
import {
  ArrowDownward,
  ArrowUpwnward,
} from "../../shared/components/Icon/Icons";

import "./FeaturedInfo.scss";

const FeaturedInfo = () => {
  return (
    <div className="feature-container">
      <div className="feature-item">
        <span className="feature-title">Revenue</span>
        <div className="feature-money-container">
          <span className="feature-money-value">$2,415</span>
          <span className="feature-money-rate">
            -11.4 <ArrowDownward className="feature-icon negative" />
          </span>
        </div>
        <span className="feature-sub">Compared to last month</span>
      </div>
      <div className="feature-item">
        <span className="feature-title">Sales</span>
        <div className="feature-money-container">
          <span className="feature-money-value">$4,415</span>
          <span className="feature-money-rate">
            -1.4 <ArrowDownward className="feature-icon negative" />
          </span>
        </div>
        <span className="feature-sub">Compared to last month</span>
      </div>
      <div className="feature-item">
        <span className="feature-title">Cost</span>
        <div className="feature-money-container">
          <span className="feature-money-value">$2,225</span>
          <span className="feature-money-rate">
            -2.4 <ArrowUpwnward className="feature-icon" />
          </span>
        </div>
        <span className="feature-sub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
