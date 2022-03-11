import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Interest(props){
  return(
  <div className="interest">
    <FontAwesomeIcon
      className="interestIcon"
      icon={props.icon}
    />
    <p className="interestLabel">{props.interestName}</p>
  </div>
  )
}

export default Interest;
