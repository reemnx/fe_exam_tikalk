import React from "react";
import "./style/global.scss";
import { MissionStatistics } from "./cmps/MissionStatistics";

export const App = () => {
  return (
    <div className="app-container flex column align-center justify-center">
      <h2><span>Tikal</span> Knowledge</h2>
      <h4>Good evning, agent MI6. Good luck <span>♣</span></h4>
      <MissionStatistics />
    </div>
  );
};

export default App;
