import React, { useState } from "react";
import "../styles.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

const Registration = () => {
  const [navigate, setNavigate] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    const url = `http://localhost:12840/api/UserRegistration/Register`;

    await axios.post(url, data);
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="form-group pt-5">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-body pb-4">
          <div>
            <h1 className="text-center pt-3 pb-4">Registration</h1>
          </div>
          <div className="username pb-4">
            <input
              type="text"
              placeholder="Name"
              className={`form-control ${errors.Name && "invalid"}`}
              {...register("Name", {
                required: "Name is Required",
                pattern: { value: /^[A-Za-z]+$/, message: "Invalid User Name" },
                minLength: {
                  value: 3,
                  message: "Name is less than 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Name is more than 15 characters",
                },
              })}
              onKeyUp={() => {
                trigger("Name");
              }}
            />
            {errors.Name && (
              <small className="text-danger">{errors.Name.message}</small>
            )}
          </div>
          <div className="email pb-4">
            <input
              type="text"
              placeholder="Email"
              className={`form-control ${errors.Email && "invalid"}`}
              {...register("Email", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              onKeyUp={() => {
                trigger("Email");
              }}
            />
            {errors.Email && (
              <small className="text-danger">{errors.Email.message}</small>
            )}
          </div>
          <div className="number pb-4">
            <input
              type="text"
              placeholder="Phone Number"
              className={`form-control ${errors.PhoneNo && "invalid"}`}
              {...register("PhoneNo", {
                required: "Phone is Required",
                pattern: {
                  value:
                    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                  message: "Invalid phone no eg:12345678901",
                },
              })}
              onKeyUp={() => {
                trigger("PhoneNo");
              }}
            />
            {errors.PhoneNo && (
              <small className="text-danger">{errors.PhoneNo.message}</small>
            )}
          </div>
          <div className="password pb-4">
            <input
              type="password"
              placeholder="Password"
              className={`form-control ${errors.Password && "invalid"}`}
              {...register("Password", {
                required: "Password is Required",
                minLength: {
                  value: 5,
                  message: "Entered password is less than 5 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Entered password is more than 15 characters",
                },
              })}
              onKeyUp={() => {
                trigger("Password");
              }}
            />
            {errors.Password && (
              <small className="text-danger">{errors.Password.message}</small>
            )}
          </div>
          <div className="footer pb-2">
            <button type="submit" className="btn btn-warning">
              Register
            </button>
          </div>
          <div className="text-center">
            Already Registered ? <Link to="/">Log In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
