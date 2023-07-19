import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../State/State";

const TopMiddle = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const dp = user.picturePath;
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [description, setDescription] = useState("");
  const userId = user.user_id;

  /* dispatch(setfriends{
    (prev)=>[...prev,{}]

  })*/

  const handlePost = () => {
    axios
      .post(
        "http://localhost:4000/posts/",
        {
          userId,
          caption,
          location,
          picturePath,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(
          setPost({
            post: response.data.post,
          })
        );
        setCaption("");
        setLocation("");
        setPicturePath("");
        setDescription("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row mt-3">
        <div className="d-flex ">
          <div className="me-4">
            <img
              src={`${dp}`}
              alt="..."
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
              }}
            />
          </div>
          <div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="text"
                style={{
                  borderRadius: "30px",
                  backgroundColor: "lightgray",
                  width: "600px",
                  height: "50px",
                }}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
              <label htmlFor="floatingInput">What's on your mind?</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="d-flex align-align-items-center">
          <div className="me-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-pin-map-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
              />
              <path
                fillRule="evenodd"
                d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
              />
            </svg>
          </div>
          <div className="me-5">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Enter Location"
                style={{ borderRadius: "20px", borderColor: " cyan" }}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ marginLeft: "165px" }} className="me-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-image-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
            </svg>
          </div>
          <div className="me-5">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Picture URL"
                style={{
                  borderRadius: "20px",
                  borderColor: "1 px solid cyan",
                }}
                onChange={(e) => {
                  setPicturePath(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row m-2">
        <textarea
          placeholder="Description"
          style={{ borderRadius: "20px", borderColor: "cyan" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="row d-flex justify-content-center m-2">
        <button
          type="button"
          className="btn btn-success w-25"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default TopMiddle;
