import React, { useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Jitsi from "react-jitsi";
import Maps from "./Maps";

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

  const runArdu = () => {
    let opts = {
      connect: true,
    };

    fetch("/runArduino", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opts),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
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
                    Todays Agends: "Professor of psychology interested in
                    sharing skills of talking and congnitive behaviuor"
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
                <tr>
                  <td>Connect to Arduino</td>
                  <td>
                    <button onClick={runArdu} className="btn btn-info mr-md-1">
                      Connect
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Go to Maps</td>
                  <td>
                    <Link className="nav-link" to={"/maps"}>
                      Maps
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
