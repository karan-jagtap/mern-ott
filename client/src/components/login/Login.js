import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="parent">
      <div className="backdrop"></div>
      <div className="container">
        <div className="row">
          <div className="col col-login">
            <div className="card-login">
              <div className="card-title-login">LOGIN</div>
              <div className="card-body-login">
                <div>
                  <input
                    className="input-login"
                    type="email"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <input
                    className="input-login"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <button className="card-button-login">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
