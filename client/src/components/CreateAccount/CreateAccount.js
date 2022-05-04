import "./CreateAccount.css";
import React, { useState } from "react";
import { GiThreeFriends } from "react-icons/gi";
import Axios from "axios";

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
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  const handleChange1 = () => {
    setChecked1(!checked1);
  };
  const handleChange2 = () => {
    setChecked2(!checked2);
  };
  const handleChange3 = () => {
    setChecked3(!checked3);
  };
  const handleChange4 = () => {
    setChecked4(!checked4);
  };

  async function loginUser(event) {
    event.preventDefault();

    if (
      password1 === "" ||
      firstName === "" ||
      surname === "" ||
      email === "" ||
      flat === "" ||
      block === ""
    ) {
      alert("Empty Fields");
    } else {
      if (
        !/[A-Za-z]+/.test(firstName) ||
        !/[A-Za-z]*/.test(middleName) ||
        !/[A-Za-z]+/.test(surname) ||
        !/[0-9]+/.test(flat) ||
        !/[0-9]+/.test(block)
      ) {
        alert(
          "Some fields contain invalid characters. Names must be comprised only of letters, and flat and block choices must contain only numbers."
        );
      } else {
        if (!/[a-z][a-z][a-z][0-9][0-9][0-9]@student.bham.ac.uk/.test(email)) {
          alert(
            'Invalid email. Email must be composed of three lowercase letters, followed by 3 numbers, ending with "@student.bham.ac.uk"'
          );
        } else {
          if (accom === "0") {
            alert("Please choose an accommodation.");
          } else {
            if (course === "0") {
              alert("Please choose a course.");
            } else {
              if (password1 !== password2) {
                alert("Passwords don't match");
              } else {
                if (!checked) {
                  alert(
                    "Before you can proceed, you need to agree to the Privacy Policy."
                  );
                } else {
                  const interests = [];
                  if (checked1 == true) {
                    interests.append("1");
                  }
                  if (checked2 == true) {
                    interests.append("2");
                  }
                  if (checked3 == true) {
                    interests.append("3");
                  }
                  if (checked4 == true) {
                    interests.append("4");
                  }
                  const response = await Axios.post(
                    "https://www.fresher-friend.bham.team:5001/createAccount",
                    {
                      email: email,
                      password: password1,
                      firstName: firstName,
                      middleName: middleName,
                      lastName: surname,
                      courseId: course,
                      accId: accom,
                      //interests: bodyFormData
                    },
                    {
                      withCredentials: true,
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  if (response.status === 201) {
                    alert("Account successfully created");
                    window.location.href = "/";
                  } else {
                    alert(
                      "An error has occurred. Please check that your credentials are correct and that your email is not already in use."
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return (
    <div>
      <h1 className="logo" aria-label="Fresher Friend Logo">
        <GiThreeFriends
          className="FresherFriendLogo"
          aria-label="Fresher Friend Logo"
        />
      </h1>
      <h1 className="maintitle">Fresher Friend</h1>
      <h2 className="subtitle">Create Your Account</h2>
      <form
        className="loginForm"
        onSubmit={loginUser}
        aria-label="Account creation form"
      >
        <div className="mb-3 inputDiv" aria-label="Account creation">
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
            aria-label="confirm password input"
            className="form-control loginInput"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <div className="mb-3 inputDiv">
          <input
            aria-label="Accommodation flat input"
            className="form-control loginInput"
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
            placeholder="Flat Number"
          />
        </div>
        <div className="mb-3 inputDiv">
          <input
            aria-label="Accommodation block Input"
            className="form-control loginInput"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            placeholder="Block"
          />
        </div>
        <p>
          Accommodation:&emsp;
          <select
            aria-label="Accommodation drop-down menu"
            class="dropdown"
            value={accom}
            onChange={(e) => setAccom(e.target.value)}
          >
            <option class="dropdown" value="0">
              Choose your accommodation
            </option>
            <option class="dropdown" value="1">
              Jarratt
            </option>
            <option class="dropdown" value="2">
              Aitken
            </option>
            <option class="dropdown" value="3">
              Ashcroft
            </option>
            <option class="dropdown" value="4">
              Battery Park
            </option>
            <option class="dropdown" value="5">
              Bournbrook
            </option>
            <option class="dropdown" value="6">
              Elgar Court
            </option>
            <option class="dropdown" value="7">
              Mason
            </option>
            <option class="dropdown" value="8">
              Shackleton
            </option>
            <option class="dropdown" value="9">
              Tennis Court
            </option>
          </select>
        </p>
        <p>
          Course:&emsp;
          <select
            aria-label="Course drop-down menu"
            class="dropdown"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option class="dropdown" value="0">
              Choose your course
            </option>
            <option class="dropdown" value="1">
              Computer Science
            </option>
            <option class="dropdown" value="2">
              English Lang
            </option>
            <option class="dropdown" value="3">
              History of Art
            </option>
            <option class="dropdown" value="4">
              Mech Engineering
            </option>
            <option class="dropdown" value="5">
              Philosophy
            </option>
            <option class="dropdown" value="6">
              Physics/Astrophysics
            </option>
            <option class="dropdown" value="7">
              Sociology
            </option>
            <option class="dropdown" value="8">
              Applied Maths
            </option>
            <option class="dropdown" value="9">
              Geology
            </option>
            <option class="dropdown" value="10">
              Human Biology
            </option>
            <option class="dropdown" value="11">
              Music
            </option>
            <option class="dropdown" value="12">
              Law
            </option>
            <option class="dropdown" value="13">
              Business
            </option>
            <option class="dropdown" value="14">
              Medicine
            </option>
            <option class="dropdown" value="15">
              Finance
            </option>
            <option class="dropdown" value="16">
              Sport Science
            </option>
          </select>
        </p>
        <p>
          Interests
          <label className="check-container">
            <input
              aria-label="Interest football"
              className="checkbox"
              type="checkbox"
              checked={checked1}
              onChange={handleChange1}
            />
            Football
          </label>
          <label className="check-container">
            <input
              aria-label="Interest games"
              className="checkbox"
              type="checkbox"
              checked={checked2}
              onChange={handleChange2}
            />
            Games
          </label>
          <label className="check-container">
            <input
              aria-label="Interest travel"
              className="checkbox"
              type="checkbox"
              checked={checked3}
              onChange={handleChange3}
            />
            Travel
          </label>
          <label className="check-container">
            <input
              aria-label="Interest cycling"
              className="checkbox"
              type="checkbox"
              checked={checked4}
              onChange={handleChange4}
            />
            Cycling
          </label>
        </p>
        <p>
          In order to register to Fresher Friend, you must agree to the &nbsp;
          <a data-testid="privacy policy Link" href="/privacy">
            Privacy Policy
          </a>
        </p>
        <p>
          <input
            aria-label="By ticking, I acknowledge and accept Fresher Friend's privacy policy"
            className="checkbox"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          By continuing, I acknowledge and accept Fresher Friend’s Privacy
          Policy
        </p>
        <input
          aria-label="create Account Button"
          type="submit"
          value="Create Account"
          className="loginButton btn btn-primary"
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

export default CreateAccount;
