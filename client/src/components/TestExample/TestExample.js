import "./TestExample.css";
import React from "react";
import Axios from "axios";

const TestExample = () => {
  async function getData() {
    const response = await Axios.get(
      "http://www.fresher-friend.bham.team:5001/test",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const {
      user_id,
      email,
      first_name,
      middle_name,
      last_name,
      acc_id,
      course_id,
    } = response.data.rows[0];

    const userContainer = document.getElementsByClassName("userInfo");
    userContainer[0].innerHTML = `
    <h3>You are logged in as</h3>
    <label>User ID: ${user_id}</label>
    <label>Email: ${email}</label>
    <label>First Name: ${first_name}</label>
    <label>Middle Name: ${middle_name}</label>
    <label>Last Name:${last_name}</label>
    <label>Accommodation ID: ${acc_id}</label>
    <label>Course ID: ${course_id}</label>
    `;
  }

  return (
    <section className="container">
      <button className="getDataBtn" onClick={getData}>
        Get user info
      </button>
      <div className="userInfo"></div>
    </section>
  );
};

export default TestExample;
