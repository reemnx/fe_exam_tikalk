import React from "react";

interface Props {
  isolatedCountry?: string;
  missionsLength?: number | null | undefined;
}

export const MissionStatsFooter = (props: Props) => {
  const { isolatedCountry, missionsLength } = props;

  return (
    <div className="dash-footer flex align-center">
      <h5 style={{ marginLeft: "0px" }}>
        Most Isolated Country: <span>{isolatedCountry}</span>
      </h5>
      <h5>Missions {missionsLength}</h5>
    </div>
  );
};
