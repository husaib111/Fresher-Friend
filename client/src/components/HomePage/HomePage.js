import GroupsList from "./GroupsList";
import { Button } from "./EventButton";
import React from "react";
import Navbar from "../Navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//NEED TO BE ABLE TO RETRIEVE THE NAME DYNAMICCALY INSTEAD OF "EVENT"
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
            </TabList>
            <TabPanel>
              <h2>Content</h2>
              <Button onClick={() => { alert("FUNCTION CALL TO DISPLAY THE EVENT INFORMATION HERE"); }}> Event Name </Button>
            </TabPanel>
            <TabPanel>
              <h2>Content</h2>
            </TabPanel>
          </Tabs>
          </div>

        </div>
      </div>
      
    );
  }
}
export default HomePage;
