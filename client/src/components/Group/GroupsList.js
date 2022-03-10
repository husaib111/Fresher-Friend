import "./GroupsList.css"
import React, {Component} from 'react';

import GroupButton from './GroupButton';

class GroupsList extends Component{
    render(){
        return(
            <div className="groupsList">
            <GroupButton />
            <GroupButton />
                <GroupButton />
                <GroupButton />
                <GroupButton />
                <GroupButton />
                <GroupButton />
            </div>
        )
    }
}

export default GroupsList;