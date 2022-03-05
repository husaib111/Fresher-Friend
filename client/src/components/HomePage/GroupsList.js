import "./GroupsList.css"
import React, {Component} from 'react';

import GroupButton from './GroupButton';

class GroupsList extends Component{
    render(){
        return(
            <div className="GroupsList">
            <GroupButton />
            <GroupButton />
            <GroupButton />
            </div>
        )
    }
}

export default GroupsList;