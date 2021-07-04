import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return <button onClick={props.onClick}>Load More</button>;
};

export default Button;
