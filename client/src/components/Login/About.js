import React from "react";
import "./About.css";
import Navbar from "../Navbar/Navbar";

function About(props) {
  return (
    <div>
      <Navbar />
      <div className="About">
        <h2>Who We Are</h2>
        <p>
          Fresher Friend is a web-based application, developed by students at 
          the University of Birmingham. Outlined below is what we have worked together
          to achieve, in order to ease the process of meeting new students at university.
        </p>
        <div>
          <h3>Our Goals</h3>
          <ul>
            <li>A secure space for users to communicate with their future and current friends in one central resource.</li>
            <li>Group together students, based on their accomodation and course.</li>
            <li>Plan upcoming events with your friends in and around campus.</li>
            <li>Remove the difficulty to find other people who will be studying alongside you when you move to the University of Birmingham.</li>
          </ul>
        </div>
        <div>
          <h3>Our Community</h3>
          <p>Fresher Friend is an inclusive safe space for all of its users. 
            Students from all backgrounds can use Fresher Friend to make the most out of their 
            university experience and make friends before starting their course. Not only does FresherFriend make it
            easier for students to socialise, they can do it in a way which suits their needs and preferences.
          </p>
          <p>Our app has been designed with accessibilty in mind. Our website can support and adapt to your needs such as:</p>
          <ul>
            <li>Entire website can be navigated using only the keyboard.</li>
            <li>A high contrast design with easy readabilty when using a Contrast Enhancer/Inverted Colours.</li>
            <li>Both mobile and desktop websites availbile to suit your device.</li>
            <li>Large buttons to ensure ease of access.</li>
          </ul>
          </div>
          <div>
          <h3>Your data, your choice</h3>
          <p>At Fresher Friend, we are determined to keep any information you give us safe and secure, as well as allow you to control the way your data is used.
            Please see the privacy policy to ensure you are aware of what data we collect and how we use it.
          </p>
        </div>
        <div>
          <h3>How to contact us</h3>
          <label>Harrison Hughes</label>
          <label>
            Email:&nbsp;
            <a href="mailto:HRH901@student.bham.ac.uk">
              HRH901@student.bham.ac.uk
            </a>
          </label>
          <label>Telephone: +44 (0)121 414 3344</label>
          <label>Postal Address:</label>
          <ul>
            <li>The University of Birmingham</li>
            <li>Edgbaston</li>
            <li>Birmingham</li>
            <li>B15 2TT</li>
            <li>United Kingdom</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
