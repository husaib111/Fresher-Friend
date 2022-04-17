import "./HomePage.css";
import GroupsList from "./GroupsList";
import EventsList from "./EventsList";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const HomePage = () => {
  const [eventLocation, setLocation] = useState("");
  const [eventName, setName] = useState("");
  const [eventStartDate, setStartDate] = useState("");
  const [eventStartTime, setStartTime] = useState("");
  const [eventEndDate, setEndDate] = useState("");
  const [eventEndTime, setEndTime] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    alert("Successfully Created Event: " + eventName);
    //here insert the values into the database
  };



  return (
    <div>
    <Navbar />
    <div className="HomePage">
      <GroupsList />
      <div class="div-1">
      <Tabs>
        <TabList>
          <Tab>Upcoming Events</Tab>
          <Tab>Previous Events</Tab>
          <Tab>Create Event</Tab>
        </TabList>
        <TabPanel>
          <EventsList></EventsList>
        </TabPanel>
        <TabPanel>
          <h2>Content</h2>
        </TabPanel>
        <TabPanel>
        <form onSubmit={onSubmit}>
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
