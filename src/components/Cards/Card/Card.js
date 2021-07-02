import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.avatar}>
        <img src={props.picture} alt="Profile picture" width="60%" height="auto"/>
      </div>
      <div className={classes.details}>
        <div>
          {props.title} {props.firstName} {props.lastName}
        </div>
        <div>{props.email}</div>
        <div>{props.location}</div>
      </div>
    </div>
  );
};

export default Card;
