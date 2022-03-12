import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol,faCertificate, faGamepad, faTrain, faBicycle, faPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import pfp from '../../resources/default_pfp.png';
import './Account.css';
import Interest from './Interest'
import Axios from "axios";

function Account(){
  const [status, setStatus] = useState([false,false,false]);
  const [priv,setPriv] = useState(true);

  const getInfo = async () => {
    await Axios.get(
      "http://www.fresher-friend.bham.team:5001/loggedInUserInfo/",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const {data} = response; 
        const {first_name,middle_name,last_name,course_name,flat_num,block_num,acc_location}=data[0];
        setInfo([first_name,middle_name,last_name,course_name,flat_num,block_num,acc_location]);
        // console.log(first_name);
      })
      .catch((e) => {
        console.log(e);
        window.location.href='/';
      });
  }

  const [info,setInfo] = useState(()=>getInfo());

  useEffect(() => {
    getInfo();
  },[]);

  const handleClick = (e) => {
    console.log(info);
    const oldStatus=status;
    oldStatus[e]=!oldStatus[e];
    setStatus([...oldStatus]);
  }
  const togglePrivate = ()=>{
    setPriv(!priv);
  }

  return(
    <div className="Account">
      <h1 className="title">
        Your Profile
      </h1>
      <hr/>
      <div className="basicInfo">
        <div className="pfpContainer">
          <img className="pfp" src={pfp} alt="Profile"/>
        </div>
        <h1>{info[0]} {info[1]} {info[2]}</h1>
        <p className="About">{info[3]}</p>
        {/* <p className="About">First Year</p> */}
        <p className="About">Flat {info[4]}, Block {info[5]}, {info[6]}</p>
      </div>
      <div className="statusButtons">
        <div className="statusButton">
          <FontAwesomeIcon 
            className={`statusIcon ${status[0] ? "isolating" : "" }`}
            icon={faCertificate}
            onClick={(e)=>handleClick(0)}
          />
          <p className="statusLabel">I'm isolating</p>
        </div>
        <div className="statusButton">
          <FontAwesomeIcon 
            className={`statusIcon ${status[1] ? "away" : "" }`}
            icon={faPlane}
            onClick={(e)=>handleClick(1)}
          />
          <p className="statusLabel">I'm away</p>
        </div>
        <div className="statusButton">
          <FontAwesomeIcon
            className={`statusIcon ${status[2] ? "guest" : "" }`}
            icon={faUser}
            onClick={(e)=>handleClick(2)}
          />
          <p className="statusLabel">I have a guest</p>
        </div>
      </div>
      <div className="interestBox">
        <h2>Interests</h2>
        <div className="interests">
          <Interest icon={faFutbol} interestName="Football"/>
          <Interest icon={faGamepad} interestName="Games"/>
          <Interest icon={faTrain} interestName="Travel"/>
          <Interest icon={faBicycle} interestName="Cycling"/>
        </div>
      </div>
      <div className="settings">
        <input 
          type="checkbox"
          defaultChecked={priv}
          onChange={()=>togglePrivate()}
        />
        <label>Private profile</label>
        <br/>
        <form action="http://www.fresher-friend.bham.team/logout">
          <button className="logout btn btn-primary" type="submit">Log out</button>
        </form>
      </div>
    </div>
  )
}

export default Account;
