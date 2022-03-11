import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol,faCertificate, faGamepad, faTrain, faBicycle, faPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import pfp from '../../resources/default_pfp.png';
import './Account.css';
import Interest from './Interest'

class Account extends Component{
  constructor(props) {
    super(props);
    this.state = {
      status: [false,false,false],
      private: true
    }
  }
  handleClick = (e) => {
    const oldStatus=this.state.status;
    console.log(e);
    oldStatus[e]=!oldStatus[e];
    this.setState({status:oldStatus}); 
  }
  togglePrivate = ()=>{
    this.setState({private:!this.state.private});
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
            <FontAwesomeIcon 
              className={`statusIcon ${this.state.status[0] ? "isolating" : "" }`}
              icon={faCertificate}
              onClick={()=>this.handleClick(0)}
            />
            <p className="statusLabel">I'm isolating</p>
          </div>
          <div className="statusButton">
            <FontAwesomeIcon 
              className={`statusIcon ${this.state.status[1] ? "away" : "" }`}
              icon={faPlane}
              onClick={(e)=>this.handleClick(1)}
            />
            <p className="statusLabel">I'm away</p>
          </div>
          <div className="statusButton">
            <FontAwesomeIcon
              className={`statusIcon ${this.state.status[2] ? "guest" : "" }`}
              icon={faUser}
              onClick={(e)=>this.handleClick(2)}
            />
            <p className="statusLabel">I have a guest</p>
          </div>
        </div>
        <div className="interestBox">
          <h2>Interests</h2>
          <div className="interests">
            <Interest icon={faFutbol} interestName="Football"/>
            <Interest icon={faGamepad} interestName="Games"/>
            <Interest icon={faTrain} interestName="Travel"/>
            <Interest icon={faBicycle} interestName="Cycling"/>
          </div>
        </div>
        <div className="settings">
          <input 
            type="checkbox"
            defaultChecked={this.state.private}
            onChange={()=>this.togglePrivate()}
          />
          <label>Private profile</label>
          <br/>
          <button className="logout btn btn-primary" type="button">Log out</button>
        </div>
      </div>
    )
  }
}

export default Account;
