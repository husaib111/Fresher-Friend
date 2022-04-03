import React from "react";
import "./About.css";
import Navbar from "../Navbar/Navbar";

function About(props) {
  return (
    <div>
      <Navbar />
      <div className="About">
        <h2>Fresher Friend Privacy Policy</h2>
        <p>
          Fresher Friend is a web-based application, developed by students at
          the University of Birmingham. This privacy policy explains what
          personal data our organization collects, how we store your
          information, for how long, and how we utilise your data.
        </p>
        <div>
          <h3>Document outline:</h3>
          <ul>
            <li>What data do we collect?</li>
            <li>How do we collect your data?</li>
            <li>How will we use your data?</li>
            <li>How do we store your data?</li>
            <li>What are your data protection rights?</li>
            <li>Our cookie policy</li>
            <li>Privacy policies of external websites</li>
            <li>How to contact us</li>
            <li>How to contact the appropriate authorities</li>
          </ul>
        </div>
        <div>
          <h3>What data do we collect?</h3>
          <p>Our Organisation collects the following data:</p>
          <ol>
            <li>
              Personal identification information:
              <ul>
                <li>First Name, Middle Name(s), Surname</li>
                <li>University Email Address (@student.bham.ac.uk)</li>
                <li>Passwords</li>
              </ul>
            </li>
            <li>
              Educational information:
              <ul>
                <li>Course</li>
                <li>Year of Study</li>
                <li>Accommodation (Type, Block, Flat)</li>
              </ul>
            </li>
          </ol>
        </div>
        <div>
          <h3>How do we collect your data?</h3>
          <p>
            You directly provide Fresher Friend with the majority of the data
            that is collected. We obtained process your information when you:
          </p>
          <ul>
            <li>Register an account.</li>
            <li>Complete or review your profile.</li>
            <li>Update your password.</li>
            <li>Use or view our website via your browser’s cookies.</li>
          </ul>
          <p>
            Fresher Friend may also receive communication data indirectly from
            the following sources:
          </p>
          <ul>
            <li>The messaging service on Fresher Friend.</li>
          </ul>
        </div>
        <div>
          <h3>How will we use your data?</h3>
          <table>
            <tr>
              <th>Data</th>
              <th>Purpose</th>
            </tr>
            <tr>
              <td>Personal identification information</td>
              <td>To identify the user</td>
            </tr>
            <tr>
              <td>Educational information</td>
              <td>
                To allocate you with other users, based on shared attributes
              </td>
            </tr>
          </table>
          <p>
            WE DO NOT, AT ANY POINT, SELL OR DISCLOSE YOUR INFORMATION TO THIRD
            PARTIES.
          </p>
        </div>
        <div>
          <h3>How do we store your data?</h3>
          <p>
            Fresher Friend securely stores your data on a cloud server that is
            protected by conventional security measures. Fresher Friend will
            keep your personal data for 3 years. Once this time period has
            expired, your data will be deleted by removing it from our database.
          </p>
        </div>
        <div>
          <h3>What are your data protection rights?</h3>
          <ul>
            <li>
              <b>The right to access</b> – You have the right to request Fresher
              Friend for copies of your personal data.
            </li>
            <li>
              <b>The right to rectification</b> – You have the right to request
              that Fresher Friend correct any information you believe is
              inaccurate. You also have the right to request Fresher Friend to
              complete the information you believe is incomplete.
            </li>
            <li>
              <b>The right to erasure</b> – You have the right to request that
              Fresher Friend erase your personal data, under certain conditions.
            </li>
            <li>
              <b>The right to restrict processing</b> – You have the right to
              request that Fresher Friend restrict the processing of your
              personal data, under certain conditions.
            </li>
            <li>
              <b>The right to object to processing</b> – You have the right to
              object to Fresher Friend’s processing of your personal data, under
              certain conditions.
            </li>
            <li>
              <b>The right to data portability</b> – You have the right to
              request that Fresher Friend, transfer the data that we have
              collected to another organisation, or directly to you, under
              certain conditions.
            </li>
          </ul>
          <p>
            Upon initialising a request, we will provide you with the relevant
            data within one month of your inquiry. If you have any comments or
            queries in connection with our Privacy Notice or wish to exercise
            any of your privacy rights, please contact us via email, post or
            telephone listed below.
          </p>
        </div>
        <div>
          <h3>Our cookie policy</h3>
          <p>
            When accessing our web application, we may retrieve information from
            you automatically through cookies or similar technology. For further
            information regarding cookies, visit:&nbsp;
            <a href="https://allaboutcookies.org">allaboutcookies.org</a>.
          </p>
        </div>
        <div>
          <h3>How do we use cookies?</h3>
          <p>
            Fresher Friend uses cookies in numerous ways in order to improve
            your experience while on our website, including:
          </p>
          <ul>
            <li>Keeping you logged in to our website</li>
            <li>Understanding how you use Fresher Friend</li>
          </ul>
        </div>
        <div>
          <h3>What types of cookies do we use?</h3>
          <p>
            Fresher Friend uses a range of cookies including both session and
            persistent cookies. Fresher Friend uses cookies for functionality so
            that we are able to recognise you and remember your previously
            selected preferences. This could include what language you prefer
            and your location. A mix of first-party and third-party cookies are
            in use.
          </p>
        </div>
        <div>
          <h3>How to manage cookies</h3>
          <p>
            You can disallow cookies in your browser settings, however this can
            give rise to certain features our of website being disabled in some
            situations.
          </p>
        </div>
        <div>
          <h3>Privacy policies of external websites</h3>
          <p>
            The Fresher Friend website may contain links to other external
            sites. Our privacy policy applies only to our website.By clicking
            these links,it is then your responsibility to read their additional
            privacy policies.
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
        <div>
          <h3>How to contact the appropriate authority</h3>
          <p>
            Should you wish to report a complaint or if you feel that Fresher
            Friend has not addressed your concern in a satisfactory manner, you
            may contact the Information Commissioner’s Office.
          </p>
          <label>
            Email:&nbsp;
            <a href="mailto:icocasework@ico.org.uk">icocasework@ico.org.uk</a>
          </label>
          <label>Telephone: 0303 123 1113</label>
          <label>Postal Address:</label>
          <ul>
            <li>Information Commissioner’s Office</li>
            <li>Wycliffe House</li>
            <li>Water Lane</li>
            <li>Wilmslow</li>
            <li>Cheshire</li>
            <li>SK9 5AF</li>
            <li>United Kingdom</li>
          </ul>
          <p>
            Our privacy policy is subject to change. This policy was last
            updated on 8th March 2022.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
