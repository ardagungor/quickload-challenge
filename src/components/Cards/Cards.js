import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import classes from "./Cards.module.css";
import axios from "axios";
import Button from "../reusable/Button/Button";

const Cards = () => {
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [limit, setLimit] = useState(15);
  const [id, setId] = useState("");
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
        console.log(res.data.data);
        setUsers(res.data.data);
        setUsers2(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadFullProfile = () => {
    axios({
      url: "https://dummyapi.io/data/api/user/" + id,
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

  // const filter = () => {
  //   const updatedUsers = users.filter((user) => {
  //     return user.firstName.toLowerCase().search(text.toLowerCase());
  //   });
  //   setUsers(updatedUsers);
  //   console.log(users);
  // };

  // const filter = (e) => {
  //   const updatedUsers = users.filter((user) => {
  //     return (
  //       user.firstName.toLowerCase().search(e.target.value.toLowerCase()) !== -1
  //     );
  //   });
  //   setUsers(updatedUsers);
  //   console.log(users);
  // };
  const filter = () => {
    const updatedUsers = users.filter((user) => {
      return user.firstName.toLowerCase().search(text.toLowerCase()) !== -1;
    });
    setUsers(updatedUsers);
    console.log(users);
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
      // location={user.location.country}
    />
  ));

  useEffect(() => {
    loadData();
    console.log(users);
  }, [limit]);

  return (
    <div>
      <div className={classes.topRow}>
        <h3>USER LIST</h3>
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
            // onChange={filter}
          />
          <Button text="Filter" onClick={filter} />
        </div>
      </div>
      <div className={classes.cards}>
        {
          /* {users.map((user) => {
          return (
            <Card
              key={user.id}
              picture={user.picture}
              title={user.title.charAt(0).toUpperCase() + user.title.slice(1)}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              location={user.location}
            />
          );
        })} */ userList
        }
      </div>
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
