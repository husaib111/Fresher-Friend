import "./HomePage.css";
import GroupsList from "./GroupsList";
import EventsList from "./EventsList";
import React from "react";
import Navbar from "../Navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


//NEED TO BE ABLE TO RETRIEVE THE NAME DYNAMICCALY INSTEAD OF "EVENT"
//PLACE A EVENTLIST INSIDE THE TABS RATHER THAN BUTTONS
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "Name",
      eventLocation: 2,
      eventStartDate: 0,
      eventStartTime: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
//USE THIS FUNCTION TO WORK ON HOW TO SUBMIT THE DATA TO DATABASE
  handleSubmit(event) {
    alert('Successfully created event');
    event.preventDefault();
  }
  render() {
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
            <form onSubmit={this.handleSubmit}>
        <label>
          Event Name: 
          <input
            name="eventName"
            type="string"
            value={this.state.eventName}
            onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <label>
          Event Location: 
          <input
            name="eventLocation"
            type="number"
            value={this.state.eventLocation}
            onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <label>
          Event Start Date: 
          <input
            name="eventStartDate"
            type="date"
            value={this.state.eventStartDate}
            onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <label>
          Event Start Time: 
          <input
            name="eventStartTime"
            type="time"
            value={this.state.eventStartTime}
            onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <input className="EventButtonCircle" type="submit" value="Create" />
      </form>
              
            </TabPanel>
          </Tabs>
          </div>

        </div>
      </div>
      
    );
  }
}
export default HomePage;
