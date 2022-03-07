import "./ProfileList.css"
import React, {Component} from 'react';

import ProfileButton from './ProfileButton';

class ProfileList extends Component{
    render(){
        return(
            <div className="ProfileList">
            <ProfileButton />
            <ProfileButton />
                <ProfileButton />
                <ProfileButton />
                <ProfileButton />
                <ProfileButton />
                <ProfileButton />
            </div>
        )
    }
}

export default ProfileList;