import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./profile.css";

const Profile = () => {
  const token = localStorage.token;
  const decoded = jwt_decode(token);
  const email = decoded.identity.email;
  const name = decoded.identity.firstName + " " + decoded.identity.lastName;

  return (
    <div className="container">
      <div className="">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
        </div>
        <table className="table col-md-6 mx-auto">
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
        <button className="btn btn-info mr-md-3" onClick={createGroup}>Create a group</button>
        <button className="btn btn-info mr-md-3">Join a group</button>
      </div>
    </div>
  );
};

export default Profile;
