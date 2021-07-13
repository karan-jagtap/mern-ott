import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "../login/Login.css";
import "./Register.css";
import { register_user, reset_state } from "../../actions/auth.action";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = (props) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState(null);

  const handleChangeInputText = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const onRegisterClick = (e) => {
    if (validate()) {
      //make action call here
      const user = {
        name,
        email,
        password,
      };
      console.log("Register.js onLoginClick - ", user);
      props.register_user(user);
    }
  };

  const validate = () => {
    let flag = false;
    if (name === null || name === "") {
      setNameError(true);
      setNameErrorMsg("Please enter your name");
      flag = true;
    } else {
      setNameError(false);
    }
    if (email === null || email === "") {
      setEmailError(true);
      setEmailErrorMsg("Please enter your email");
      flag = true;
    } else {
      setEmailError(false);
    }
    if (password === null || password === "") {
      setPasswordError(true);
      setPasswordErrorMsg("Please enter your password");
      flag = true;
    } else {
      setPasswordError(false);
    }
    if (confirmPassword === null || confirmPassword === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMsg("Please confirm your password");
      flag = true;
    } else {
      setConfirmPasswordError(false);
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
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMsg("Password mismatched");
      return false;
    } else {
      setConfirmPasswordError(false);
    }

    // TODO :: add minimum char for pass
    return true;
  };

  const redirectToLogin = (e) => {
    props.history.replace("/login");
  };

  if (props.auth.success) {
    props.reset_state();
    props.history.replace("/login");
  }

  return (
    <div className="parent-register">
      <div className="backdrop" style={{ position: "fixed" }}></div>
      {/* Start - App logo */}
      <div className="row mx-0 px-0" style={{ zIndex: 1 }}>
        <div className="col px-0 mx-0">
          <div className="app-logo-register">CHILLAX</div>
        </div>
      </div>
      {/* End - App logo */}

      {/* Start - Main Register Card */}
      <div className="container">
        <div className="row">
          <div className="col col-login">
            <div className="card-login" style={{ marginBottom: 20 }}>
              <div className="card-title-login">
                REGISTER
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  style={{ color: "whitesmoke", marginLeft: 16 }}
                />
              </div>
              {!props.auth.success && props.auth.message === "user_present" && (
                <span
                  className="error-login"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  User with this email already exists
                </span>
              )}
              <div className="card-body-login">
                <div className="input-layout">
                  <input
                    className={
                      nameError
                        ? "input-login input-login-error"
                        : "input-login"
                    }
                    name="name"
                    type="name"
                    placeholder="Enter name"
                    onChange={handleChangeInputText}
                  />
                  {nameError && (
                    <span className="error-login">{nameErrorMsg}</span>
                  )}
                </div>
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
                <div className="input-layout">
                  <input
                    className={
                      confirmPasswordError
                        ? "input-login input-login-error"
                        : "input-login"
                    }
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    onChange={handleChangeInputText}
                  />
                  {confirmPasswordError && (
                    <span className="error-login">
                      {confirmPasswordErrorMsg}
                    </span>
                  )}
                </div>
                <button
                  className="card-button-login"
                  onClick={onRegisterClick}
                  disabled={props.auth.loading}
                >
                  Register
                </button>
                <div style={{ color: "whitesmoke", marginTop: 10 }}>
                  Already have an account ?
                  <span
                    className="link-click-login"
                    onClick={!props.auth.loading ? redirectToLogin : null}
                  >
                    Sign In
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End - Main Register Card */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register_user, reset_state })(
  Register
);
