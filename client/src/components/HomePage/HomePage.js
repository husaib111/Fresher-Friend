import { GiThreeFriends } from "react-icons/gi";
import GroupsList from './GroupsList';
import React from 'react';

class HomePage extends React.Component{
    render(){
        return(
            <div className="HomePage">
                <h1 className="title">
                    <GiThreeFriends className="icon" />
                    Welcome to Fresher Friend.

                </h1>
                <GroupsList/>

            </div>
        )
    }
}
export default HomePage;
