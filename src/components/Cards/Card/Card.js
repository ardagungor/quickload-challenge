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
          className={classes.avatarImg}
        />
      </div>
      <div className={classes.details}>
        <div>
          <h3>
            {props.title} {props.firstName} {props.lastName}
          </h3>{" "}
          <h4>
            {loading ? (
              <Spinner />
            ) : (
              new Date().getFullYear() - birthday.substring(0, 4)
            )}{" "}
          </h4>
        </div>
        <div>
          <a href={`mailto:${props.email}`}>{props.email}</a>
        </div>
        <h4>
          {" "}
          <div>{loading ? <Spinner /> : country}</div>
        </h4>
      </div>
    </div>
  );
};

export default Card;
