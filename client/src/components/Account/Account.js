import React, {Component} from 'react';
import pfp from '../../resources/default_pfp.png';
import './Account.css';

class Account extends Component{
  render(){
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
          <h1>Jane Doe</h1>
          <p className="About">MBChB Medicine and Surgery</p>
          <p className="About">First Year</p>
          <p className="About">Flat 7, Block 41 Mason</p>
        </div>
      </div>
    )
  }
}

export default Account;
