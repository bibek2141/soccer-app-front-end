import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

var id = 0;
var isApproved = 0;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [error, setError] = useState("");
  const [notApproved, setNotApproved] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = `http://localhost:12840/api/UserRegistration/Login`;
    const data = {
      Email: email,
      Password: password,
    };
    try {
      if (data.Email === "" && data.Password === "") {
        setError(true);
      } else {
        try {
          await axios.post(url, data).then((result) => {
            const dt = result.data;
            if (
              dt.registrationUser.email.toLowerCase() !== email.toLowerCase() &&
              dt.registrationUser.password !== password
            ) {
              setError(true);
              return;
            }
            setNavigate(true);
            id = dt.registrationUser.role;
            isApproved = dt.registrationUser.isApproved;
            if (isApproved === 0 && id === 2) {
              setNotApproved(true);
            }
            localStorage.setItem("loggedin", true);
            localStorage.setItem("role", dt.registrationUser.role);
            localStorage.setItem("id", dt.registrationUser.id);
            localStorage.setItem("name", dt.registrationUser.name);
          });
        } catch (e) {
          setError(true);
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (navigate) {
    if (id === 2) {
      if (isApproved !== 0) {
        return <Navigate to="/userDashBoard" />;
      }
    } else {
      return <Navigate to="/adminDashBoard" />;
    }
  }

  const handleRegister = () => {
    window.location.href = "/register";
  };
  return (
    <div className="form">
      <div className="form-body">
        <div className="Title">
          <h3 className="text-center pb-2">Login</h3>
        </div>
        {error && (
          <div
            className="alert text-center alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>
              Incorrect Email or Password. All fields are required.{" "}
            </strong>
          </div>
        )}
        {notApproved && (
          <div
            className="alert text-center alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>
              Your account is not approved by admin yet. Please check back
              later.
            </strong>
          </div>
        )}
        <div className="email pb-4">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="password pb-4">
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      <div className="footer">
        <div className="px-2">
          <button
            type="submit"
            className="btn btn-warning"
            onClick={(e) => handleLogin(e)}
          >
            Log In
          </button>
        </div>
        <div className="px-2">
          <button
            type="submit"
            className="btn btn-warning"
            onClick={(e) => handleRegister(e)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
