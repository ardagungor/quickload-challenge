import React, { useState, useEffect } from "react";
import classes from "./Card.module.css";
import axios from "axios";

const Card = (props) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.avatar}>
        <img
          src={props.picture}
          alt={props.firstname + " " + props.lastName}
          width="60%"
          height="auto"
        />
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
