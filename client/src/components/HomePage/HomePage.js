import { GiThreeFriends } from "react-icons/gi";
import React, {Component} from 'react';
import GroupsList from './GroupsList';

class HomePage extends Component{
    render(){
        return(
            <div className="HomePage">
                <h1 className="title">
                    <GiThreeFriends className="icon" />
                    Welcome to Fresher Friend.
                    <GroupsList/>
                </h1>

            </div>
        )
    }
}

export default HomePage;
