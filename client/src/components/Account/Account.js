import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faCertificate,
  faPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";
import Interest from "./Interest";
import Axios from "axios";
import Navbar from "../Navbar/Navbar";

function Account() {
  library.add(fas);
  const [status, setStatus] = useState([]);
  const [priv, setPriv] = useState(true);

  const doLogout = async () => {
    await Axios.get("https://www.fresher-friend.bham.team:5001/logout/", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/";
  };

  const generateInterests = (row) => {
    const { interest_name, interest_icon } = row;
    return (
      <Interest interestName={interest_name} icon={["fas", interest_icon]} />
    );
  };

  const [interests, setInterests] = useState([]);

  const getInfo = async () => {
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/loggedInUserInfo/",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        const {
          first_name,
          middle_name,
          last_name,
          course_name,
          flat_num,
          block_num,
          acc_location,
        } = data[0];
        setInfo([
          first_name,
          middle_name,
          last_name,
          course_name,
          flat_num,
          block_num,
          acc_location,
        ]);
      })
      .catch((e) => {
        console.log(e);
        // window.location.href = "/";
      });
  };

  const [info, setInfo] = useState(() => getInfo());
  const getStatus = async () => {
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/loggedInUserStatus/",
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
        const { isolating, away, guest, priv } = data[0];
        // console.log(isolating);
        console.log("setting status to" + isolating + away + guest + priv);
        setStatus([
          parseInt(isolating),
          parseInt(away),
          parseInt(guest),
          parseInt(priv),
        ]);
      })
      .catch((e) => {
        console.log(e);
        // window.location.href = "/";
      });
  };


    const getPF = async() => {
	await Axios.get(
	    "https://www.fresher-friend.bham.team/loggedInUserProfile/",
	    {
		withCredentials:true,
		headers: {
		    "Content-Type": "application/json",
		},
	    }
	)
	    .then((response) => {
		console.log(response);
		const {data} = response;
		const {filename} = data;
		console.log(filename);
		setpf(filename);
	    })
	    .catch((e) => {
		console.log(e);
	    });
    };

  const [pf, setpf] = useState(() => getPF());

  useEffect(() => {
    getInfo();
    const getInterests = async () => {
      await Axios.get(
        "https://www.fresher-friend.bham.team:5001/loggedInUserInterests/",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          const { data } = response;
          const myInterests = data.map((row) => generateInterests(row));
          setInterests(myInterests);
        })
        .catch((e) => {
          console.log(e);
          // window.location.href = "/";
        });
    };
    getInterests();
    getStatus();
    getPF();
  }, []);

  // useEffect(() => {
  // },[getStatus,status]);

  const postStatus = async (status) => {
    await Axios.post(
      "https://www.fresher-friend.bham.team:5001/setStatus",
      {
        status: status,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleClick = (e) => {
    const oldStatus = status;
    // console.log(status);
    oldStatus[e] = 1 - oldStatus[e];
    console.log(oldStatus);
    postStatus(oldStatus);
    console.log("posted" + oldStatus);
    setStatus([...oldStatus]);
    console.log("set status" + status);
    // getStatus();
    // console.log("got status" + status);
    // console.log(status);
  };

  const togglePrivate = () => {
    if(priv) {
      setPriv(false);
      console.log("private account: " + priv);
    } else {
      setPriv(true);
      console.log("private account: " + priv);
    }
    handleClick(3);
  };

  return (
    <div>
      <Navbar />
      <div className="Account" aria-label="Your Profile">
        <h1 className="title">Your Profile</h1>
        <hr />
        <div className="basicInfo" aria-label="Profile information">
          <div className="pfpContainer">
            <a href="/profileUpload"><img className="pfp" src={"https://www.fresher-friend.bham.team/"+pf} alt="Profile" aria-label="Profile picture"/></a>
          </div>
          <h1>
            {info[0]} {info[1]} {info[2]}
          </h1>
          <p className="About" aria-label="Course information">{info[3]}</p>
          {/* <p className="About">First Year</p> */}
          <p className="About" aria-label="accommodation information">
            Flat {info[4]}, Block {info[5]}, {info[6]}
          </p>
        </div>
        <div className="statusButtons" aria-label="Profile status">
          <div className="statusButton" aria-label={`statusIcon ${status[0] ? "isolating" : ""}`}>
            <FontAwesomeIcon 
              aria-label={`statusIcon ${status[0] ? "isolating" : ""}`}
              className={`statusIcon ${status[0] ? "isolating" : ""}`}
              id={`statusIcon ${status[0] ? "isolating" : ""}`}
              icon={faCertificate}
              tabIndex="0"
              onClick={(e) => handleClick(0)}
            />
            <p className="statusLabel">I'm isolating</p>
          </div>
          <div className="statusButton" aria-label={`statusIcon ${status[1] ? "away" : ""}`}>
            <FontAwesomeIcon 
              aria-label={`statusIcon ${status[1] ? "away" : ""}`}
              className={`statusIcon ${status[1] ? "away" : ""}`}
              id={`statusIcon ${status[1] ? "away" : ""}`}
              icon={faPlane}
              tabIndex="0"
              onClick={(e) => handleClick(1)}
            />
            <p className="statusLabel">I'm away</p>
          </div>
          <div className="statusButton" aria-label={`statusIcon ${status[2] ? "guest visiting" : ""}`}>
            <FontAwesomeIcon
              aria-label={`statusIcon ${status[2] ? "guest visiting" : ""}`}
              className={`statusIcon ${status[2] ? "guest" : ""}`}
              id={`statusIcon ${status[2] ? "guest" : ""}`}
              icon={faUser}
              tabIndex="0"
              onClick={(e) => handleClick(2)}
            />
            <p className="statusLabel">I have a guest</p>
          </div>
        </div>
        <div className="interestBox">
          <h2>Interests</h2>
          <div className="interests">
            {interests}
            {/* <Interest icon={faFutbol} interestName="Football"/> */}
            {/* <Interest icon={faGamepad} interestName="Games"/> */}
            {/* <Interest icon={faTrain} interestName="Travel"/> */}
            {/* <Interest icon={faBicycle} interestName="Cycling"/> */}
          </div>
        </div>
        <div className="settings">
            <label><input className="PrivateProfileToggle"
                 type="checkbox"
                 defaultChecked={priv}
                 onChange={() => togglePrivate()}
                 /> Private profile</label>
          <br />
          <form onSubmit={doLogout}>
            <button className="logout btn btn-primary" type="submit">
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
