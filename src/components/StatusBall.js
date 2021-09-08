import React from "react";
import "./StatusBall.css";

const StatusBall = (props) => {
  const { status, variant } = props;
  const returnColor = () => {
    switch (status) {
      case "normal":
        return "#9BFF00";
      case "warning":
        return "#FFAA32";
      case "worrying":
        return "#FFE600";
      case "critical":
        return "#C40050";
      default:
        return "#E5E5E5";
    }
  };

  const style = {
    backgroundColor: returnColor(),
  };

  return <div style={style} className={`ball ${variant}`}></div>;
};

export default StatusBall;
