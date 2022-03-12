import "./ProfileList.css"
import Axios from "axios";
import React, {useState, useEffect, Component} from 'react';

import ProfileButton from './ProfileButton';

function makeProfileButton(name){
  const {first_name} = name;
  return(<ProfileButton name={first_name}/>);
}

function ProfileList(){
    const getInfo = async () => {
      await Axios.get(
        "http://localhost:5001/users/accId/",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          const {data} = response; 
          console.log(data);
          const {first_name}=data;
          console.log(first_name);
          // const divForProfileList = document.getElementByClassname('ProfileList');
          const buttons=data.map(name=>makeProfileButton(name))
          setInfo(buttons);
          console.log(first_name);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    const [info,setInfo] = useState(()=>getInfo());  
    useEffect(() => {
      getInfo();
    },[]); 

    return(

        <div className="ProfileList">
          {info}
        </div>
        )
}

export default ProfileList;
