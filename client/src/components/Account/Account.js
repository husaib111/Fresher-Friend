import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import pfp from '../../resources/default_pfp.png';
import './Account.css';

class Account extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isolating: false,
      away: false,
      guest: false
    }
  }

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
        <div className="statusButtons">
          <div className="statusButton">
             <FontAwesomeIcon icon={faCertificate} />
          </div>
          <div className="statusButton">
             <FontAwesomeIcon icon={faPlane} />
          </div>
          <div className="statusButton">
             <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
    )
  }
}

export default Account;
