import "./App.css";
import React, { useState } from "react";
import Card from "./components/Card";
import StatusBall from "./components/StatusBall";
import elderly_f from "./assets/icons/elderly_f.png";
import elderly_help from "./assets/icons/elderly_help.png";
import heartBeat from "./assets/icons/heart-beat.png";
import thermometer from "./assets/icons/thermometer.png";
import gyroscope from "./assets/icons/gyroscope.png";
import blood_pressure from "./assets/icons/blood-pressure.png";
import Amplify from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  },
});

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: process.env.REACT_APP_REGION,
    aws_pubsub_endpoint: process.env.REACT_APP_MQTT_ENDPOINT,
  })
);

function App() {
  const [data, setData] = useState(0);
  const [status, setStatus] = useState(0);
  const [led, setLed] = useState(1);
  const [temperature, setTemperature] = useState(0);

  const scale = (number, inMin, inMax, outMin, outMax) => {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };
  const trucate = (number, decimals) => {
    return Number(number.toFixed(decimals));
  };

  Amplify.PubSub.subscribe([
    "powerTopic",
    "buttonTopic",
    "tempTopic",
  ]).subscribe({
    next: (data) => {
      console.log(data.value);
      if (data.value.sensor == "acelerometer") {
        setData(scale(data.value.value, 0, 790, 60, 155));
      }
      if (data.value.sensor == "button") {
        setStatus(data.value.value);
      }
      if (data.value.sensor == "temperature") {
        setTemperature(scale(data.value.value, 100, 400, 0, 45));
      }
    },
    error: (error) => console.error(error),
    close: () => console.log("Done"),
  });

  console.log(data);
  const publishMessageON = () => {
    try {
      Amplify.PubSub.publish("ledTopic", "h");
      setLed(1);
    } catch (error) {
      console.log(error);
    }
  };

  const publishMessageOFF = () => {
    try {
      Amplify.PubSub.publish("ledTopic", "l");
      setLed(0);
    } catch (error) {
      console.log(error);
    }
  };

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
            <StatusBall status={status ? "critical" : "normal"} />
          </div>
          <div className="led-buttons">
            <div
              onClick={publishMessageOFF}
              className={!led ? `led-button led-active` : `led-button`}
            >
              <StatusBall status="critical" />
            </div>
            <div
              onClick={publishMessageON}
              className={led ? `led-button led-active` : `led-button`}
            >
              <StatusBall status="normal" />
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card-container">
            <Card bgColor="white">
              <div className="card-content">
                <img className="card-img" src={heartBeat} />
                <p>{trucate(data, 0)}</p>
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
                <img className="card-img" src={thermometer} />
                <p>{trucate(temperature, 0)}</p>
                <p>ºC</p>
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
