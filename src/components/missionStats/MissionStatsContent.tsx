import React from "react";
import { Mission } from "../../services/missionsService";

interface Props {
  missions: Mission[] | null;
  farthestMission: Mission | null;
  closestMission: Mission | null;
}

export const MissionStatsContent = (props: Props) => {
  const { missions, farthestMission, closestMission } = props;
  return (
    <>
      {missions?.map((mission: Mission, idx: number) => {
        return (
          <div
            className={`${
              mission.address === farthestMission?.address
                ? "farthest"
                : mission.address === closestMission?.address
                ? "closest"
                : ""
            } dash-mission-wraper flex align-center`}
            key={mission.date} // Using date for unique value, object have no _id property
          >
            <span className="agent-id ">
              <h5>{mission.agent}</h5>
            </span>
            <span className="country ">
              <h5>{mission.country}</h5>
            </span>
            <span className="address ">
              <h5>{mission.address}</h5>
            </span>
            <span className="date ">
              <h5 style={{marginLeft:"10px"}}>{mission.date}</h5>
            </span>
          </div>
        );
      })}
    </>
  );
};
