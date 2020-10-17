import React from "react";
import "./style/global.scss";
import { MissionStatistics } from "./components/missionStats/MissionStatistics";

export const App = () => {
  return (
    <div className="app-container flex column align-center justify-center">
      <h2><span>Tikal</span> Knowledge</h2>
      <h4>Good morning, agent MI6. <span>♣</span></h4>
      <MissionStatistics />
      <div className="app-more-info flex align-center">
      <h5>Agent, need more info?</h5>
      <a href="https://www.linkedin.com/in/reem-alon-401816127/" target="_blank"><span className="linkedin" /></a>
      </div>
    </div>
  );
};

export default App;
