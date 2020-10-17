import React, { useState, useEffect } from "react";
import { LoaderModal } from "../../modals/LoaderModal";
import { MissionsStatsHeader } from "./MissionStatsHeader";
import { MissionStatsContent } from "./MissionStatsContent";
import { MissionStatsFooter } from "./MissionStatsFooter";
import {
  missions,
  Mission,
  ascendingOrder,
  closestFarthestFromOrigin,
  getIsolatedCountry,
} from "../../services/missionsService";

interface MissionState {
  missionList: Mission[] | null;
  farthestMission: Mission | null;
  closestMission: Mission | null;
  isolatedCountry: string;
}

export const MissionStatistics = () => {
  const [isLoaderShown, toggleLoader] = useState<boolean>(false);
  const [missionState, setMissionState] = useState<MissionState>({
    missionList: null,
    farthestMission: null,
    closestMission: null,
    isolatedCountry: "",
  });

  useEffect(() => {
    toggleLoader(true);
    setMissionState((prevState) => ({
      ...prevState,
      isolatedCountry: getIsolatedCountry(),
      missionList: missions,
    }));
    ascendingOrder();
  }, []);

  useEffect(() => {
    if (!missionState.missionList?.length) return;
    const getClosestFarthestMissions = async () => {
      const res = await closestFarthestFromOrigin(missionState.missionList);
      setMissionState((prevState) => ({
        ...prevState,
        farthestMission: res.farthest,
        closestMission: res.closest,
      }));
      toggleLoader(false);
    };
    getClosestFarthestMissions();
  }, [missionState.missionList]);

  return (
    <>
      <div className="missions-stats-container flex column space-between">
        <MissionsStatsHeader />
        <MissionStatsContent
          missions={missionState.missionList}
          closestMission={missionState.closestMission}
          farthestMission={missionState.farthestMission}
        />
        <MissionStatsFooter
          isolatedCountry={missionState.isolatedCountry}
          missionsLength={missionState.missionList?.length}
        />
      </div>
      {isLoaderShown && <LoaderModal />}
    </>
  );
};
