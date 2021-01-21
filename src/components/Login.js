import React, { useState } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./logUp.css";

const Login = ({callfromParent}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowLogin, setAllowLogin] = useState(false);

  let history = useHistory();

  const onSubmitClick = (e) => {
    e.preventDefault();
    let opts = {
      email: email,
      password: password,
    };
    console.log(opts);
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opts),
    })
      .then((r) => {
        return r.json();
      })
      .then((resp) => {
        if (resp.result.allowLogin) {
          setAllowLogin(true);
        
        }
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <form>
      {allowLogin ? <Redirect to="/profile" /> : <Redirect to="/login" />}
      <h3>Log In</h3>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleEmailChange}
          value={email}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button
        type="submit"
        onClick={onSubmitClick}
        className="btn btn-primary btn-block"
      >
        Submit
      </button>
    </form>
  );
};

export default Login;

{
  /* <div>
  <h2>Login</h2>
  <form action="#">
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={handleUsernameChange}
        value={username}
      />
    </div>
    <div>
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
      />
    </div>
    <button onClick={onSubmitClick} type="submit">
      Login Now
    </button>
  </form>
</div> */
}
