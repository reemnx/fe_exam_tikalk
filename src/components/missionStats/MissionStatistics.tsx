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
  missions: Mission[] ;
  farthestMission: Mission | null;
  closestMission: Mission | null;
  isolatedCountry?: string;
}

export const MissionStatistics = () => {
  const [isLoaderShown, toggleLoader] = useState<boolean>(false);
  const [missionState, setMissionState] = useState<MissionState>({
    missions: missions,
    farthestMission: null,
    closestMission: null,
  });

  useEffect(() => {
    toggleLoader(true);
    setMissionState((prevState) => ({
      ...prevState,
      isolatedCountry: getIsolatedCountry()
    }));
    ascendingOrder();
  }, []);

  useEffect(() => {
    const getClosestFarthestMissions = async () => {
      const res = await closestFarthestFromOrigin(missionState.missions);
      setMissionState((prevState) => ({
        ...prevState,
        farthestMission: res.farthest,
        closestMission: res.closest,
      }));
      toggleLoader(false);
    };
    if (missionState.missions?.length){
      getClosestFarthestMissions();
    }
  }, [missionState.missions]);

  return (
    <>
      <div className="missions-stats-container flex column space-between">
        <MissionsStatsHeader />
        <MissionStatsContent
          missions={missionState.missions}
          closestMission={missionState.closestMission}
          farthestMission={missionState.farthestMission}
        />
        <MissionStatsFooter
          isolatedCountry={missionState.isolatedCountry}
          missionsLength={missionState.missions?.length}
        />
      </div>
      {isLoaderShown && <LoaderModal />}
    </>
  );
};
