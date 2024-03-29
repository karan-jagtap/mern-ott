import React, { useState } from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../config/keys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { login_user, login_user_google } from "../../actions/auth.action";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = (props) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState(undefined);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(undefined);

  const handleChangeInputText = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onLoginClick = (e) => {
    if (validate()) {
      //make action call here
      const user = {
        email,
        password,
      };
      console.log("Login.js onLoginClick - ", user);
      props.login_user(user);
    }
  };

  const validate = () => {
    let flag = false;
    if (email === undefined || email === "") {
      setEmailError(true);
      setEmailErrorMsg("Please enter your email");
      flag = true;
    } else {
      setEmailError(false);
    }
    if (password === undefined || password === "") {
      setPasswordError(true);
      setPasswordErrorMsg("Please enter your password");
      flag = true;
    } else {
      setPasswordError(false);
    }
    if (flag) {
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      setEmailErrorMsg("Please enter a valid email");
      return false;
    } else {
      setEmailError(false);
    }

    // TODO :: add minimum char for pass
    return true;
  };

  const onGoogleSuccessLoginClick = (res) => {
    console.log("Login.js - onGoogleSuccessLoginClick = ", res);
    const data = {
      name: res.profileObj.name,
      email: res.profileObj.email,
    };
    props.login_user_google(data);
  };

  const onGoogleFailedLoginClick = (res) => {
    console.log("Login.js - onGoogleFailedLogin = ", res);
  };

  const redirectToRegister = (e) => {
    props.history.replace("/register");
  };

  if (props.auth.success) {
    if (props.auth.user.role === "normal") {
      props.history.replace("/dashboard");
    } else if (props.auth.user.role === "admin") {
      props.history.replace("admin-dashboard");
    }
  }

  return (
    <div className="parent">
      <div className="backdrop"></div>
      <div>
        <div className="app-logo-login">CHILLAX</div>
        <div className="container" style={{ padding: 0 }}>
          <div className="row">
            <div className="col col-login">
              <div className="card-login">
                <div className="card-title-login">
                  LOGIN
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ color: "whitesmoke", marginLeft: 16 }}
                  />
                </div>
                {!props.auth.success &&
                  props.auth.message === "invalid_credentials" && (
                    <span
                      className="error-login"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: 14,
                      }}
                    >
                      Invalid Login Credentials
                    </span>
                  )}
                <div className="card-body-login">
                  <div className="input-layout">
                    <input
                      className={
                        emailError
                          ? "input-login input-login-error"
                          : "input-login"
                      }
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      onChange={handleChangeInputText}
                    />
                    {emailError && (
                      <span className="error-login">{emailErrorMsg}</span>
                    )}
                  </div>
                  <div className="input-layout">
                    <input
                      className={
                        passwordError
                          ? "input-login input-login-error"
                          : "input-login"
                      }
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      onChange={handleChangeInputText}
                    />
                    {passwordError && (
                      <span className="error-login">{passwordErrorMsg}</span>
                    )}
                  </div>
                  <button
                    className="card-button-login"
                    onClick={onLoginClick}
                    disabled={props.auth.loading}
                  >
                    Login
                  </button>
                  <div className="or-layout-login">
                    <div className="line-or-login"></div>
                    <div className="or-login">OR</div>
                    <div className="line-or-login"></div>
                  </div>
                  <GoogleLogin
                    className="google-button"
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={onGoogleSuccessLoginClick}
                    onFailure={onGoogleFailedLoginClick}
                    cookiePolicy={"single_host_origin"}
                    disabled={props.auth.loading}
                  />
                  <div style={{ color: "whitesmoke", marginTop: 10 }}>
                    New to{" "}
                    <span style={{ color: "#f0bf33", fontSize: 20 }}>
                      ChillaX ?
                    </span>
                    <span
                      className="link-click-login"
                      onClick={!props.auth.loading ? redirectToRegister : null}
                    >
                      Register here
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login_user, login_user_google })(
  Login
);
