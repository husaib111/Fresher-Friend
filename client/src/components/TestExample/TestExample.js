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
    const data = response.data.rows[0];
    console.log(data);
    const label = document.getElementsByClassName("fetchData");
    label[0].innerText = data;
  }

  return (
    <section className="container">
      <button className="getDataBtn" onClick={getData}>
        Get data
      </button>
      <label className="fetchData"></label>
    </section>
  );
};

export default TestExample;
