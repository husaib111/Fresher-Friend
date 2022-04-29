import "./CreateAccount.css";
import React from "react";
const CreateAccount = () => {
  return (
      <div>
          <h1 className="title">Create Your Account</h1>
		  <form className="loginForm">
        <div className="mb-3 inputDiv">
          <input
            aria-label="firstNameInput"
            className="form-control loginInput"
            //value={firstName}
            //onChange={(e) => setEmail(e.target.value)}
            placeholder="First Name"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="middleNameInput"
            className="form-control loginInput"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            placeholder="Middle Name"
          />
        </div>
        <div className="mb-3 inputDiv">
          <input
            aria-label="surnameInput"
            className="form-control loginInput"
            //value={firstName}
            //onChange={(e) => setEmail(e.target.value)}
            placeholder="Surname"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="emailInput"
            className="form-control loginInput"
            //value={firstName}
            //onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="passwordInput1"
            className="form-control loginInput"
            type="password"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="passwordInput"
            className="form-control loginInput"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="flatInput"
            className="form-control loginInput"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            placeholder="Flat Number"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="blockInput"
            className="form-control loginInput"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            placeholder="Block"
          />
        </div>
		Accomodation:&emsp;
		<select>
        <option value="Jarratt">Jarratt</option>
        <option value="">demo</option>
        <option value="">demo</option>
        </select>
		<p>
		Course:&emsp;
		<select>
        <option value="">Computer Science</option>
        <option value="">demo</option>
        <option value="">demo</option>
        </select>
		</p>
		<p>
		Interests
        <label className="check-container">
          <input
            aria-label="checkPrivacy"
            className="checkbox"
            type="checkbox"
            //checked={checked}
            //onChange={handleChange}
          />
          Demo Interest
        </label>
		</p>
        <input
          aria-label="createAccountButton"
          type="submit"
          value="Create Account"
          className="loginButton btn btn-primary"
        ></input>
	  </form>
	  </div>
    );
};

export default CreateAccount;
