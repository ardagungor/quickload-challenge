import React, { useState, useEffect } from "react";
import classes from "./Card.module.css";
import axios from "axios";
import Spinner from "../../reusable/Spinner/Spinner";

const Card = (props) => {
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    axios({
      url: "https://dummyapi.io/data/api/user/" + props.id,
      method: "get",
      headers: {
        "app-id": "60df4c7ef681a11a9025e58c",
      },
    })
      .then((res) => {
        setCountry(res.data.location.country);
        setBirthday(res.data.dateOfBirth);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

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
          {props.title} {props.firstName} {props.lastName},{" "}
          {loading ? (
            <Spinner />
          ) : (
            new Date().getFullYear() - birthday.substring(0, 4)
          )}
        </div>
        <div>{props.email}</div>
        <div>{loading ? <Spinner /> : country}</div>
      </div>
    </div>
  );
};

export default Card;
