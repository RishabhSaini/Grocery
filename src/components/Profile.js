import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Jitsi from "react-jitsi";

import "./profile.css";

const Profile = () => {
  const token = localStorage.token;
  const decoded = jwt_decode(token);
  const email = decoded.identity.email;
  const name = decoded.identity.firstName + " " + decoded.identity.lastName;
  const [startMeeting, setStartMeeting] = useState(false);

  const roomName = email + name;
  const handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand("toggleVideo");
    console.log(JitsiMeetAPI);
  };

  return (
    <div className="container">
      <div className="">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
        </div>
        <table className="table md-6 mx-auto">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
        <div className="sm-8 mx-auto">
          <h3 className="text-center">Study Session Groups</h3>
        </div>
        <table className="table md-6 mx-auto">
          <tbody>
            <tr>
              <td>ECE216: Communication Design</td>
              <td>
                Todays Agends: "Professor of psychology interested in sharing
                skills of talking and congnitive behaviuor"
              </td>
              <td>
                <button
                  className="btn btn-info mr-md-1"
                  onClick={() => {
                    setStartMeeting(true);
                  }}
                >
                  Join
                </button>
              </td>
              <td>
                {startMeeting && (
                  <Jitsi
                    onAPILoad={handleAPI}
                    roomName={roomName}
                    displayName={name}
                    config={{ prejoinPageEnabled: false }}
                  />
                )}
              </td>
            </tr>

            <tr>
              <td>Bananas</td>
              <td>Quantity: 2</td>
              <td>
                <button className="btn btn-info mr-md-1">Join</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
