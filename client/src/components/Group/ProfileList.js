import "./ProfileList.css";
import "./ProfileButton.css";
import "./Group.css";
import Axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProfileList(props) {
  const [pfs, setPfs] = useState([]);
  let params = useParams();
  const getInfo = useCallback(async () => {
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/" + params.type + "Users",
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
        const buttons = data.map((name, i) => makeProfileButton(name, i));
        console.log(buttons);
        setInfo(buttons);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.type]);

  const getPfs = useCallback(async () => {
    await Axios.get("https://www.fresher-friend.bham.team/" + params.type + "Users", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const { data } = response;
        // console.log(data);
        data.map(async (name) => {
          const {  email } = name;
          const username = email.substring(0, email.lastIndexOf("@"));

          await Axios.get("https://www.fresher-friend.bham.team/profile/" + username, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            console.log(response);
            const { data } = response;
            const { filename } = data;
              console.log("pfs:" + pfs);
            setPfs(pfs.push(filename));
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pfs, params.type]);

  const [info, setInfo] = useState([]);
  useEffect(() => {
    getPfs();
    getInfo();
  }, [getInfo,getPfs]);

  function ProfileButton(props) {
    console.log(pfs[props.add]);
    return (
      <div className="ProfileButton">
        <a href={"/account/" + props.username}>
          <div className="ProfileButtonCircle">
            <img
		alt="Profile"
              src={"https://www.fresher-friend.bham.team/" + pfs[props.add]}
              className={"ProfileButtonIcon"}
            />
          </div>
          <h1 className="ProfileButtonTitle">{props.name}</h1>
        </a>
      </div>
    );
  }

  function makeProfileButton(name, i) {
    console.log(name);
    const { first_name, email } = name;
    const username = email.substring(0, email.lastIndexOf("@"));
    return (
      <ProfileButton name={first_name} username={username} key={i} add={i} />
    );
  }

  return <div className="ProfileList">{info}</div>;
}

export default ProfileList;
