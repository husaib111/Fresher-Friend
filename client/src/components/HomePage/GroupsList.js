import "./GroupsList.css"
import "./GroupButton.css";
import "./HomePage.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import {FaHome, FaUniversity} from "react-icons/fa";
import {BsFillQuestionDiamondFill} from "react-icons/bs";
// import React from 'react';

function GroupButton(props) {

    let groupButtonIcon ;
    groupButtonIcon = () => {
        if(props.type==="accommodation"){
            return(<FaHome className={"GroupButtonIcon"} />)
        }
        else if (props.type==="course"){
            return(<FaUniversity className={"GroupButtonIcon"}  />)
        }
        else{
            return(<BsFillQuestionDiamondFill className={"GroupButtonIcon"} />)
        }
    }

  return (
    <div className="GroupButton">
      <a href={"/group/"+props.type}>
        <div className="GroupButtonCircle">
            {groupButtonIcon()}
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
  return <div aria-label="Group chats" className="groupsList">
    <GroupButton aria-label="Accommodation chat button" name={"Flat "+accom} type="accommodation"/>
    <GroupButton aria-label="Course chat button" name={course} type="course"/>
  </div>;
  }

export default GroupsList;
