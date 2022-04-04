import GroupsList from "./GroupsList";
import EventsList from "./EventsList";
import CreateEvent from "./CreateEvent";
import React from "react";
import Navbar from "../Navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//NEED TO BE ABLE TO RETRIEVE THE NAME DYNAMICCALY INSTEAD OF "EVENT"
//PLACE A EVENTLIST INSIDE THE TABS RATHER THAN BUTTONS
class HomePage extends React.Component {
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
            <TabPanel><CreateEvent></CreateEvent></TabPanel>
          </Tabs>
          </div>

        </div>
      </div>
      
    );
  }
}
export default HomePage;
