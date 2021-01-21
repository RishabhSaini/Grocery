import React from "react";
import { Redirect } from "react-router-dom";

import "./profile.css";

const Profile = () => {
  
  return (
    <div>
      <button className="myButton">Join a group</button>
      <input type="text" placeholder="group id" />

      <button className="myButton">Create a group</button>
    </div>
  );
};

export default Profile;
