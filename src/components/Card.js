import "./Card.css";
import React from "react";

const Card = (props) => {
  const { children, bgColor } = props;

  const style = {
    background: bgColor,
  };

  return (
    <div style={style} className="card">
      {children}
    </div>
  );
};

export default Card;
