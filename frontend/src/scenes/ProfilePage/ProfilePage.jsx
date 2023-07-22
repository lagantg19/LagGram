import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const name = profile.firstName + " " + profile.lastName;
  const email = profile.email;

  const location = profile.location;
  const occupation = profile.occupation;
  const dp = profile.picturePath;

  const [extra, setExtra] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${id}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setExtra(response.data.friends.length);
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const posts = useSelector((state) => state.posts);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Calculate the count whenever the posts or id change
    const calculate = () => {
      let newCount = 0;
      posts.forEach((post) => {
        if (post.userId === id) {
          newCount++;
        }
      });
      setCount(newCount);
    };

    calculate(); // Call the calculate function on the initial render
  }, [posts, id]); // Run the effect whenever posts or id change

  return (
    <div className="profile overflow-scroll">
      <div className=" container  ">
        <div className="row ">
          <div className="col-4 mt-5">
            <img
              src={`${dp}`}
              alt="..."
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "100%",
              }}
            />
          </div>
          <div className="col  d-flex align-items-center m-0 ">
            <div className="row " style={{ width: "100%" }}>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h1>Name:{name}</h1>
                  </div>
                  <div className="col d-flex justify-content-center">
                    <button type="button" className="btn btn-warning">
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <h4>Posts: {count}</h4>
                  </div>
                  <div className="col">
                    <h4>Friends:{extra}</h4>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col ">
                    <h4>Location: {location}</h4>
                  </div>
                </div>
                <div className="row ">
                  <div className="col ">
                    <h4>Occupation: {occupation}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-5" style={{ color: "yellow" }} />
        <div className="row d-flex justify-content-evenly">
          {posts.map((post) => {
            if (post.userId === id) {
              return (
                <div className="col-4" key={post._id} style={{border:"1px solid white",borderColor:"white"}}>
                  <img
                    src={post.picturePath}
                    alt="..."
                    style={{ hegiht: "100%", width: "100%" }}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
