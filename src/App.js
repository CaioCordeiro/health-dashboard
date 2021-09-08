import "./App.css";
import React from "react";
import Card from "./components/Card";
import StatusBall from "./components/StatusBall";
import elderly_f from "./assets/icons/elderly_f.png";
import elderly_help from "./assets/icons/elderly_help.png";
import heartBeat from "./assets/icons/heart-beat.png";
import thermometer from "./assets/icons/thermometer.png";
import gyroscope from "./assets/icons/gyroscope.png";
import blood_pressure from "./assets/icons/blood-pressure.png";


function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <div className="header">
          <Card bgColor="#7F67FB">
            <div className="card-content">
              <img className="profile-img" src={elderly_f} />
              <p>Lurdes Da Silva</p>
              <p>95</p>
            </div>
          </Card>
          <div className="help-status">
            <img className="help-img" src={elderly_help} />
            <StatusBall status="critical" />
          </div>
        </div>
        <div className="cards">
          <div className="card-container">
            <Card bgColor="white">
              <div className="card-content">
                <img className="card-img" src={heartBeat} />
                <p>95</p>
                <p>bpm</p>
                <div className="status">
                  <StatusBall variant="small" status="normal" />
                </div>
              </div>
            </Card>
          </div>
          <div className="card-container">
            <Card bgColor="white">
              <div className="card-content">
                <img className="card-img" src={blood_pressure} />
                <p>95</p>
                <p>bpm</p>
                <div className="status">
                  <StatusBall variant="small" status="warning" />
                </div>
              </div>
            </Card>
          </div>
          <div className="card-container">
            <Card bgColor="white">
              <div className="card-content">
                <img className="card-img" src={gyroscope} />
                <p>95</p>
                <p>bpm</p>
                <div className="status">
                  <StatusBall variant="small" status="worrying" />
                </div>
              </div>
            </Card>
          </div>
          <div className="card-container">
            <Card bgColor="white">
              <div className="card-content">
                <img className="card-img" src={thermometer} />
                <p>95</p>
                <p>bpm</p>
                <div className="status">
                  <StatusBall variant="small" status="critical" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default App;
