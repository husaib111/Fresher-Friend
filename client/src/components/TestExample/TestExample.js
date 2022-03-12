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
    <label>${user_id}</label>
    <label>${email}</label>
    <label>${first_name}</label>
    <label>${middle_name}</label>
    <label>${last_name}</label>
    <label>${acc_id}</label>
    <label>${course_id}</label>
    `;
  }

  return (
    <section className="container">
      <button className="getDataBtn" onClick={getData}>
        Get data
      </button>
      <label className="fetchData"></label>
      <div className="userInfo"></div>
    </section>
  );
};

export default TestExample;
