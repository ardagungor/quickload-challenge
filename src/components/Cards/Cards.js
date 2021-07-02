import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import classes from "./Cards.module.css";
import axios from "axios";

const Cards = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(15);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    axios({
      url: "https://dummyapi.io/data/api/user?limit=" + limit,
      method: "get",
      headers: {
        "app-id": "60df4c7ef681a11a9025e58c",
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadData();
    console.log(users);
  }, [limit]);
  return (
    <div>
      <div className={classes.topRow}>
        <h3>USER LIST</h3>
        <div className={classes.searchRow}>
          <input type="text" className={classes.search} />
          <button>FILTER</button>
        </div>
      </div>
      <div className={classes.cards}>
        {users.map((user) => {
          return (
            <Card
              picture={user.picture}
              title={user.title}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              location={user.location}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
