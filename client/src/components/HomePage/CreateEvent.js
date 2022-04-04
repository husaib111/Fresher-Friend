import React, { useState } from "react";
import "./CreateEvent.css";
import Axios from "axios";

const CreateEvent = () => {

    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
  
    //const [checked, setChecked] = useState(false);

    //const handleChange = () => {
     // setChecked(!checked);
    //};

    async function create(event) {
        event.preventDefault();
    
          const response = await Axios.post(
            "https://www.fresher-friend.bham.team:5001/createEvent",
            {
                Name: Name,
                Location: Location,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          const data = response.data;
    
          if (data.success) {
            alert("Event Creation Successful");
          } else {
            alert(
              "Missing some information"
            );
          }
        }
  
  
      return (
        <form onSubmit={this.handleSubmit}>
          <label className="loginForm"> Name:     <input type="text" value={this.state.value} onChange={(e) => setName(e.target.value)} /> </label> <br></br>
          <label className="loginForm"> Location: <input type="text" value={this.state.value} onChange={(e) => setLocation(e.target.value)} /> </label> <br></br>
          <label className="loginForm"> Start Date: <input type="date" value={this.state.value} onChange={this.handleChange} /> </label> <br></br>
          <label className="loginForm"> End Date: <input type="date" value={this.state.value} onChange={this.handleChange} /> </label> <br></br>
          
          <input onSubmit={create} type="submit" value="create" />
        </form>
      );
  }; export default CreateEvent;