import "./GroupsList.css"
import React, {Component} from 'react';

import GroupButton from './GroupButton';
import GroupButtonn from './GroupButtonn';

class GroupsList extends Component{
    render(){
        return(
            <div className="groupsList">
            <GroupButton />
            <GroupButtonn />
            </div>
        )
    }
}

export default GroupsList;
