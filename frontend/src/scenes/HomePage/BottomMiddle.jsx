import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setPostLike, setPosts } from "../../State/State";

const BottomMiddle = () => {
  const [allusers, setAllusers] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get("http://localhost:4000/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        dispatch(setPosts({ posts: response.data.posts }));
      })
      .catch((err) => console.log(err));
  }, []);
  //get all users
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/getAll/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setAllusers(response.data);
      });
  }, []);
  const handleFriend = (id, friendId) => {
    axios
      .patch(
        `http://localhost:4000/user/${id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(
          setFriends({
            friends: response.data,
          })
        );
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleLike = (id) => {
    axios
      .patch(
        `http://localhost:4000/posts/${id}/like`,
        {
          userId: user.user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(
          setPostLike({
            updatedPost: response.data.updatedPost
          })
        )
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
  const posts = useSelector((state) => state.posts);
  return (
    <div>
      {posts.map((post) => {
        return (
          <div
            style={{ backgroundColor: "white", borderRadius: "20px" }}
            key={post._id}
            className="mt-4"
          >
            <div className="row">
              {allusers.map((i) => {
                if (i._id === post.userId) {
                  return (
                    <div key={i._id} className="mt-2 d-flex align-items-center">
                      <div className="me-3" style={{ marginLeft: "10px" }}>
                        <img
                          src={i.picturePath}
                          alt="user"
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "100%",
                          }}
                        />
                      </div>
                      <div className="m-0 p-0">
                        <h5 className="m-0 ">{i.firstName}</h5>
                        <div className="m-0 p-0" style={{ color: "lightgray" }}>
                          {i.location}
                        </div>
                        <div>
                          {i._id !== user.user_id && (
                            <button
                              style={{ borderRadius: "100%" }}
                              onClick={() => handleFriend(user.user_id, i._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-person-fill-add"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <hr />
            <div className="row d-flex mt-4" key={post._id}>
              <div className="row " style={{ marginLeft: "10px" }}>
                <h5>{post.caption}</h5>
              </div>
              <div className="row " style={{ marginLeft: "10px" }}>
                <p style={{ color: "gray" }}>{post.description}</p>
              </div>
              <div className="row">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ marginLeft: "10px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div style={{ color: "gray" }}>{post.location}</div>
                </div>
              </div>
              <div>
                {" "}
                <img
                  className="mt-3"
                  src={post.picturePath}
                  alt="post"
                  style={{
                    marginLeft: "10px",
                    maxWidth: "100%",
                    height: "95%",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div className="row ">
                <div className="d-flex">
                  <div className="me-5">
                    <button
                      className="border-0"
                      style={{ borderRadius: "100%" }}
                      onClick={() => handleLike(post._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="red"
                        className="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>Likes:{Object.keys(post.likes).length}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomMiddle;
