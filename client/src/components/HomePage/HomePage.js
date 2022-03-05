import { GiThreeFriends } from "react-icons/gi";
import React, {Component} from 'react';

class HomePage extends Component{
    render(){
        return(
            <div className="App">
                <h1 className="title">
                    <GiThreeFriends className="icon" />
                    Welcome to Fresher Friend.
                </h1>
            </div>
        )
    }
}

export default HomePage;
