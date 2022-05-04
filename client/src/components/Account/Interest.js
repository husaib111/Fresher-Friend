import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";

function Interest(props){
  return(
  <div className="interest" aria-label={props.interestName}>
    <FontAwesomeIcon
      aria-label={props.interestName}
      className="interestIcon"
      icon={props.icon}
    />
    <p className="interestLabel">{props.interestName}</p>
  </div>
  )
}

export default Interest;
