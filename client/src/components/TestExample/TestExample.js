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

    console.log(response);
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
    <title>You are logged in as</title>
    <label className="userLabel">User ID: ${user_id}</label>
    <label className="userLabel">Email: ${email}</label>
    <label className="userLabel">First Name: ${first_name}</label>
    <label className="userLabel">Middle Name: ${middle_name}</label>
    <label className="userLabel">Last Name:${last_name}</label>
    <label className="userLabel">Accommodation ID: ${acc_id}</label>
    <label className="userLabel">Course ID: ${course_id}</label>
    `;
  }

  return (
    <section className="container">
      <button className="getDataBtn" onClick={getData}>
        Get data
      </button>
      <div className="userInfo"></div>
    </section>
  );
};

export default TestExample;
