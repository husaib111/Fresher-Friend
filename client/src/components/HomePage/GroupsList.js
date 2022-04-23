import "./GroupsList.css"
import "./GroupButton.css";
import "./HomePage.css";
import {IoHome} from "react-icons/io5";
import Axios from "axios";
import React, { useState, useEffect } from "react";
// import React from 'react';

function GroupButton(props) {
  return (
    <div className="GroupButton">
      <a href={"/group/"+props.type}>
        <div className="GroupButtonCircle">
          <IoHome className={"GroupButtonIcon"} />
        </div>
        <div className="GroupButtonTitle">
          <h1>{props.name}</h1>
        </div>
      </a>
    </div>
  );
}

// function makeGroupButton(name) {
//   const { first_name } = name;
//   return <GroupButton name={first_name} />;
// }

function GroupsList(props) {
  // const getInfo = async () => {
  //   await Axios.get("http://localhost:5001/courseUsers", {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       const { data } = response;
  //       // console.log(data);
  //       const buttons = data.map((name) => makeGroupButton(name));
  //       console.log(buttons);
  //       setInfo(buttons);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const [info, setInfo] = useState([]);
  // useEffect(() => {
  //   getInfo();
  // }, []);

  const getAccom = async () => {
    console.log("here");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/accomInfo",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        // console.log(data);
        const {flat_num} = data[0];
        // console.log(flat_num);
        setAccom(flat_num);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [accom, setAccom] = useState([]);
  useEffect(() => {
    getAccom();
  });
  const getCourse = async () => {
    console.log("here");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/courseInfo",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        const {course_name} = data[0];
        // console.log(course_name);
        setCourse(course_name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [course, setCourse] = useState([]);
  useEffect(() => {
    getCourse();
  });
  return <div className="groupsList">
    <GroupButton name={"Flat "+accom} type="accommodation"/>
    <GroupButton name={course} type="course"/>
  </div>;
  }

export default GroupsList;
