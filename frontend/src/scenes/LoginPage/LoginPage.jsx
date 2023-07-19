import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../State/State";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const Navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  

  const dispatch = useDispatch();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(
          setLogin({
            user: response.data,
            token: response.data.token,
          })
        );
        Navigate('/home')
      })
      .catch((err) => {alert(err.message)
        console.log(err)});

    // dispatch(
    //   setLogin({
    //     user,
    //     token,
    //   })
    // );
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Login</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="row d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-success mt-3 "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="mt-3">
            <Link to="/register">
              <h5>New user? Register -{">"}</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
