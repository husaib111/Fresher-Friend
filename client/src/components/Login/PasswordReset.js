import "./PasswordReset.css";
import React, { useState } from "react";
import { GiThreeFriends } from "react-icons/gi";
//import Axios from "axios";

//const email = "fxa307@student.bham.ac.uk";

const PasswordReset = () => {

    const [email, setEmail] = useState("");
    //const [user, setUser] = useState("");
    /*
    async function resetP(event) {
      event.preventDefault();

      
        const response = await Axios.post(

          "http://localhost:3000/passwordReset?", //Localhost!
          {
            email: email,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if(data.success) {
            console.log("User valid: " + email);
            //setUser(email);
        } else {
            alert("Your account is not recognised, please check your email address.");
        }
    
  
    }
    */
    return (
        <div>
          <h1 className="logo" aria-label="Fresher Friend Logo">
            <GiThreeFriends
              className="FresherFriendLogo"
              aria-label="Fresher Friend Logo"
            />
          </h1>
          <h1 className="maintitle">Fresher Friend</h1>
          <h2 className="subtitle">Reset your Password</h2>
          <form
            className="loginForm"
            aria-label="password reset form"
          >
            <div className="mb-3 inputDiv">
              <input
                aria-label="email Input"
                className="form-control loginInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="example@student.bham.ac.uk"
          />
        </div><input
          aria-label="create Account Button"
          type="submit"
          value="Reset Password"
          className="loginButton btn btn-primary"
          /*onClick={resetP} */
        ></input>
        <form action="/#">
          <button
            aria-label="Return to login Button"
            className="btn btn-primary"
          >
            Return to Login
          </button>
        </form>
        </form>
        </div>
    );
};

export default PasswordReset;
