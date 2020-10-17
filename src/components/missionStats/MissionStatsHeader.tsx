import React from "react";

export const MissionsStatsHeader = () => {
  return (
    <div className="dash-header flex align-center">
      <span className="agent-id ">
        <h5>Agent ID</h5>
      </span>
      <span className="country ">
        <h5>Country</h5>
      </span>
      <span className="address ">
        <h5>Address</h5>
      </span>
      <span className="date ">
        <h5>Date</h5>
      </span>
    </div>
  );
};
