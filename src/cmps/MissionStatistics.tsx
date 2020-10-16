import React, { useState, useEffect } from "react";
import { LoaderModal } from "../modals/LoaderModal";
import {
  missions,
  Mission,
  ascendingOrder,
  oppositeMissions,
  getIsolatedCountry,
} from "../services/missionsService";

export const MissionStatistics = () => {
  const [missionList, setMissions] = useState<Mission[]>([]);
  const [farthestMission, setFarthest] = useState<Mission | null>(null);
  const [closestMission, setclosest] = useState<Mission | null>(null);
  const [isLoaderShown, toggleLoader] = useState<boolean>(false);
  const [mostIsolatedCountry, setIsolatedCountry] = useState<string>("");

  useEffect(() => {
    setIsolatedCountry(getIsolatedCountry());
    toggleLoader(true);
    ascendingOrder();
    setMissions(missions);
  }, []);

  useEffect(() => {}, [closestMission, farthestMission]);

  useEffect(() => {
    if (!missionList.length) return;
    const getMinMaxMissions = async () => {
      const minMax = await oppositeMissions(missionList);
      toggleLoader(false);
      setFarthest(minMax.farthest);
      setclosest(minMax.closest);
    };
    getMinMaxMissions();
  }, [missionList]);

  return (
    <React.Fragment>
      <div className="missions-stats-container flex column space-between">
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
        {missionList.map((mission, idx) => {
          return (
            <div
              className={`${
                mission.address === farthestMission?.address
                  ? "farthest"
                  : mission.address === closestMission?.address
                  ? "closest"
                  : ""
              } dash-mission-wraper flex align-center`}
              key={idx}
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
                <h5>{mission.date}</h5>
              </span>
            </div>
          );
        })}
        <div className="dash-footer text-end flex align-center">
          <h5>
            Most Isolated Country: {mostIsolatedCountry} ,{missionList.length}{" "}
            Missions
          </h5>
        </div>
      </div>
      {isLoaderShown && <LoaderModal />}
    </React.Fragment>
  );
};
