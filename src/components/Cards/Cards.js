import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import classes from "./Cards.module.css";
import axios from "axios";
import Button from "../reusable/Button/Button";
import Spinner from "../reusable/Spinner/Spinner";

const Cards = () => {
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [limit, setLimit] = useState(15);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  const loadData = () => {
    axios({
      url: "https://dummyapi.io/data/api/user?limit=" + limit,
      method: "get",
      headers: {
        "app-id": "60df4c7ef681a11a9025e58c",
      },
    })
      .then((res) => {
        setUsers(res.data.data);
        setUsers2(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filter = () => {
    const updatedUsers = users.filter((user) => {
      return (
        user.firstName.toLowerCase().search(text.toLowerCase()) !== -1 ||
        user.lastName.toLowerCase().search(text.toLowerCase()) !== -1 ||
        user.email.toLowerCase().search(text.toLowerCase()) !== -1
      );
    });
    setUsers(updatedUsers);
  };
  const removeFilter = () => {
    setUsers(users2);
    setText("");
  };
  const userList = users.map((user) => (
    <Card
      key={user.id}
      picture={user.picture}
      title={user.title.charAt(0).toUpperCase() + user.title.slice(1)}
      firstName={user.firstName}
      lastName={user.lastName}
      email={user.email}
      id={user.id}
    />
  ));

  useEffect(() => {
    loadData();
  }, [limit]);

  return (
    <div>
      <div className={classes.topRow}>
        <h2>USER LIST</h2>
        <div className={classes.searchRow}>
          <Button text="Remove filter" onClick={removeFilter} />
          <input
            type="text"
            className={classes.search}
            placeholder="Search by name"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
          <Button text="Filter" onClick={filter} />
        </div>
      </div>
      <div className={classes.cards}>{loading ? <Spinner /> : userList}</div>
      <Button
        text="Load More"
        onClick={() => {
          setLimit(limit + 15);
        }}
      />
    </div>
  );
};

export default Cards;
