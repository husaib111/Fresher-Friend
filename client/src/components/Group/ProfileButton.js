import "./ProfileButton.css";
import "./Group.css";
import React, {useState, useEffect, Component} from 'react';
import {IoPersonCircle} from "react-icons/io5";
import Axios from "axios";

function ProfileButton(){
  
    const getInfo = async (i) => {
      await Axios.get(
        "http://localhost:5001/userInfo/"+i,
        {
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          const {data} = response; 
          const {first_name}=data[0];
          setInfo([first_name]);
          console.log(first_name);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    const [info,setInfo] = useState(()=>getInfo(1));  
    useEffect(() => {
      getInfo(1);
    },[]); 

    return(
      <div className="ProfileButton">
          <a href={"/myAccount"}>
          <div className="ProfileButtonCircle">
              <IoPersonCircle className={"ProfileButtonIcon"} />
          </div>
          <div className="ProfileButtonTitle">
              <h1>{info[0]}</h1>
          </div>
          </a>
      </div>
  )
}


//class ProfileButton extends Component{
//    render(){
        




export default ProfileButton;