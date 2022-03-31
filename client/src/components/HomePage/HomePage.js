import GroupsList from "./GroupsList";
import React from "react";
import Navbar from "../Navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="HomePage">
          <GroupsList />
          <Tabs>
            <TabList>
              <Tab>Upcoming Events</Tab>
              <Tab>Previous Events</Tab>
            </TabList>
            <TabPanel>
              <h2>Content</h2>
            </TabPanel>
            <TabPanel>
              <h2>Content</h2>
            </TabPanel>
          </Tabs>

        </div>
      </div>
      
    );
  }
}
export default HomePage;
