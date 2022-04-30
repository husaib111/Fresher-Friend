import "./CreateAccount.css";
import React, { useState } from "react";
//import Axios from "axios";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [flat, setFlat] = useState("");
  const [block, setBlock] = useState("");
  const [accom, setAccom] = useState("");
  const [course, setCourse] = useState("");

  const [checked, setChecked] = useState(false);
  
  const handleChange = () => {
    setChecked(!checked);
  };
  
  
  async function loginUser(event) {
    event.preventDefault();

     
      
		if(password1 === "" || firstName==="" || surname ==="" || email ==="" || flat === "" || block===""){
			alert("Empty Fields");
		}
	    else {
	    if(!/[A-Za-z]+/.test(firstName)||!/[A-Za-z]*/.test(middleName)||!/[A-Za-z]+/.test(surname)||!/[0-9]+/.test(flat)||!/[0-9]+/.test(block)){
			alert("Some fields contain invalid characters. Names must be comprised only of letters, and flat and block choices must contain only numbers.");
		}
		else{
		if (!/[a-z][a-z][a-z][0-9][0-9][0-9]@student.bham.ac.uk/.test(email)){
			alert("Invalid email. Email must be composed of three lowercase letters, followed by 3 numbers, ending with \"@student.bham.ac.uk\"");
		}
		else{
		if (accom === "0"){
			alert("Please choose an accommodation.");
		}
		else{
		if (course === "0"){
			alert("Please choose a course.");
		}
		else{
			if (password1 !== password2)
		  {
			  alert("Passwords don't match");
		  }
		else{
			if (!checked) {
      alert("Before you can proceed, you need to agree to the Privacy Policy.");
			}
		else{
			const response = await Axios.post(
				"https://www.fresher-friend.bham.team:5001/createAccount",
				{
					email: email,
					password: password1,
					firstName: firstName,
					middleName: middleName,
					lastName, lastName,
					courseId: course,
					accId: accom,
				},
				{
				withCredentials: true,
				headers: {
            "Content-Type": "application/json",
          },
		  if (response.status === 201){
			alert("Account successfully created);
            return <Redirect to "/login/" />
		  }
		  else{
			alert("An error has occurred. Please check that your credentials are correct and that your email is not already in use.");  
		  }
        }
      );
       
		}
		}}}}}}
    }
  
  return (
      <div>
          <h1 className="title">Create Your Account</h1>
		<form className="loginForm" onSubmit={loginUser}>
        <div className="mb-3 inputDiv">
          <input
            aria-label="firstNameInput"
            className="form-control loginInput"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="middleNameInput"
            className="form-control loginInput"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Middle Name (optional)"
          />
        </div>
        <div className="mb-3 inputDiv">
          <input
            aria-label="surnameInput"
            className="form-control loginInput"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="emailInput"
            className="form-control loginInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="passwordInput1"
            className="form-control loginInput"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Password"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="passwordInput2"
            className="form-control loginInput"
			type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="flatInput"
            className="form-control loginInput"
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
            placeholder="Flat Number"
          />
        </div>
		<div className="mb-3 inputDiv">
          <input
            aria-label="blockInput"
            className="form-control loginInput"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            placeholder="Block"
          />
        </div>
		Accomodation:&emsp;
		<select class="dropdown" value={accom} onChange={(e) => setAccom(e.target.value)}>
        <option class="dropdown" value="0">Choose your accommodation</option>
        <option class="dropdown" value="1">Jarratt</option>
        <option class="dropdown" value="2">demo</option>
        </select>
		<p>
		Course:&emsp;
		<select class="dropdown" value={course} onChange={(e) => setCourse(e.target.value)}>
        <option class="dropdown" value="0">Choose your course</option>
        <option class="dropdown" value="1">Computer Science</option>
        <option class="dropdown" value="2">demo</option>
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
		<p>
		In order to register to FresherFriend, you must agree to the &nbsp;
		<a data-testid="privacy policy Link" href="/privacy">
            Privacy Policy
          </a>
		 </p>
		<p>
		<input
            aria-label="By ticking, I acknowledge and accept FresherFriend's privacy policy"
            className="checkbox"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          By continuing, I acknowledge and accept FresherFriend’s Privacy Policy
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
