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
          to achieve in this application
        </p>
        <div>
          <h3>Our Goals</h3>
          <ul>
            <li>A secure space for users to communicate with their future and current friends in one central resource.</li>
            <li>Group together people based on their accomodation and course.</li>
            <li>Plan upcoming events with your friends.</li>
            <li>Remove the need to have to search all over social media to find future friends.</li>
          </ul>
        </div>
        <div>
          <h3>Keeping your data safe and making a positive impact</h3>
          <p>At Fresher Friend, we are determined to keep any information you give us safe and secure and allow you to have a choice about the way you're data is used.
            Please see the privacy policy to ensure you are aware of what data we collect.
          </p>
        </div>
        <div>
          <h3>Our Community</h3>
          <p>Fresher Friend aims to be as much of an inclusive and safe space for all of its users. Students from all different types of backgrounds and accessibility needs can use
            Fresher Friend to make the most out of their university experience and find the friends they need before arriving at university. Not only does FresherFriend make it
            easier for students who are moving out for the first time in their life to meet people, they can do it in a way which suits their needs and preferences.
          </p>
          <p>We support the needs of any students to provide a comfortable experience when using FresherFriend.</p>
          <ul>
            <li>Entire website can be navigated using only keyboard.</li>
            <li>Dark mode and Inverted colours.</li>
            <li>Accessibility button present on all pages to ensure users can use every service we provide.</li>
            <li>Can view website on both your phone or computer.</li>
            <li>Large buttons to ensure ease of access.</li>
          </ul>
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
