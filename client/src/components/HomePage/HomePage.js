import "./HomePage.css";
import GroupsList from "./GroupsList";
import EventsList from "./EventsList";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Axios from "axios";
import Popup from 'reactjs-popup';
import { SocialIcon } from 'react-social-icons';

const ShareEvent = () => (
  <Popup trigger={<button aria-label="share event button" className="share btn" >Share</button>} position="right bottom">
    <div>Share an Event to your friends!</div>
    <SocialIcon url="https://twitter.com/" />
    <SocialIcon url="https://facebook.com/" />
    <SocialIcon url="https://www.reddit.com/" />
    <SocialIcon url="https://whatsapp.com" />
    <SocialIcon url="https://snapchat.com" />
    <SocialIcon url="https://instagram.com" />
    <SocialIcon url="https://discord.com" />
  </Popup>
);

const HomePage = () => {
  const [eventLocation, setLocation] = useState("");
  const [eventName, setName] = useState("");
  const [eventStartDate, setStartDate] = useState("");
  const [eventStartTime, setStartTime] = useState("");
  const [eventEndDate, setEndDate] = useState("");
  const [eventEndTime, setEndTime] = useState("");


  async function insertEvents(event) {
    event.preventDefault();
      console.log(eventName);

      await Axios.post(
-        "https://www.fresher-friend.bham.team:5001/insertEvent",
        {
          eventName: eventName,
          eventLocation: eventLocation,
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
	    invitees:[1,4],
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    alert("Successfully Created Event: " + eventName);
/*
      const data = response.data;

      if (data.success) {
        alert("Successfully Created Event: " + eventName);
        window.location.href = "/home";
      } else {
        alert(
          "Unable to create event"
        );
      }
      */
  }





  return (
    <div>
    <Navbar />
    <div className="HomePage">
      <GroupsList />
      <div aria-label="events section" class="div-1">
      <Tabs>
        <TabList>
          <Tab>Upcoming Events</Tab>
          <Tab>Create Event</Tab>
        </TabList>
        <TabPanel>
          <h3>Check out some upcoming Events here</h3>
          <div><EventsList></EventsList></div>
          <div><h6>Invite your friends along by pressing the button below</h6></div>
          <div className = "popupp">
          <ShareEvent></ShareEvent>
          </div>
        </TabPanel>
        <TabPanel>
        <form onSubmit={insertEvents}>
    <label>
      Event Name: 
      <input
            aria-label="nameInput"
            className="form-control loginInput"
            type="string"
            value={eventName}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Event..."
          />
    </label>
    <br /><br />
    <label>
      Event Location: 
      <input
            aria-label="locationInput"
            className="form-control loginInput"
            type="string"
            value={eventLocation}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Mason Halls..."
          />
    </label>
    <br /><br />
    <label>
      Event Start Date: 
      <input
            aria-label="startDateInput"
            className="form-control loginInput"
            type="date"
            value={eventStartDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder=""
          />
    </label>
    <label>
      Event Start Time: 
      <input
            aria-label="StartTime"
            className="form-control loginInput"
            type="time"
            value={eventStartTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder=""
          />
    </label>
    <br/><br/>
    <label>
      Event End Date: 
      <input
            aria-label="endDateInput"
            className="form-control loginInput"
            type="date"
            value={eventEndDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder=""
          />
    </label>
    <label>
      Event End Time: 
      <input
            aria-label="endTime"
            className="form-control loginInput"
            type="time"
            value={eventEndTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder=""
          />
    </label>
    <br /><br />
    <input
          aria-label="loginButton"
          type="submit"
          value="Create Event"
          className="loginButton btn btn-primary"
        ></input>
  </form>
          
        </TabPanel>
      </Tabs>
      </div>

    </div>
  </div>
  );
};

export default HomePage;
