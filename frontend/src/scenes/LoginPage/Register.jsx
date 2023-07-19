import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const Navigate=useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [picturePath, setpicturePath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/signup", {
        firstName,
        lastName,
        email,
        password,
        location,
        occupation,
        picturePath,
      })
      .then((response) => {
        console.log(response.data);
        Navigate('/')
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <h1 className="text-center">Register</h1>
        <div className="col ">
          <div className="row">
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="floatingInput">First Name</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="floatingInput">Last Name</label>
              </div>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="floatingInput">Location</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Occupation"
              onChange={(e) => setOccupation(e.target.value)}
            />
            <label htmlFor="floatingInput">Occupation</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Profilepic"
              onChange={(e) => setpicturePath(e.target.value)}
            />
            <label htmlFor="floatingInput">Profile pic</label>
          </div>
          <div className="row d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-success w-25  "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
