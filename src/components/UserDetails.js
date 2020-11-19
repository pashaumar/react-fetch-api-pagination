import React from "react";
import styles from "./UserDetails.module.css";
import { Link } from "react-router-dom";
function UserDetails() {
  let item = localStorage.getItem("items");
  item = JSON.parse(item);
  const st = {
    color: "black",
  };

  return (
    <div className={styles.userDetailsPage}>
      <div className={styles.title}>
        <Link to="/users">
          <i className="fas fa-long-arrow-alt-left" style={st}></i>
        </Link>
        <h1>User Details Page</h1>
      </div>
      <h2>
        Details: {item.first_name} {item.last_name}
      </h2>
      <p>
        First Name: <span> {item.first_name}</span>
      </p>
      <p>
        Last Name: <span> {item.last_name}</span>
      </p>
      <p>
        Company Name: <span> {item.company_name}</span>
      </p>
      <p>
        City: <span> {item.city}</span>
      </p>
      <p>
        State: <span> {item.state}</span>
      </p>
      <p>
        Zip: <span> {item.zip}</span>
      </p>
      <p>
        Email: <span> {item.email}</span>
      </p>
      <p>
        Web: <span> {item.web}</span>
      </p>
      <p>
        Age: <span> {item.age}</span>
      </p>
    </div>
  );
}

export default UserDetails;
