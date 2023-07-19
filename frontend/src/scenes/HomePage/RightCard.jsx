import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriends } from "../../State/State";

const RightCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const dp = user.picturePath;
  const id = user.user_id;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${id}/friends`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        dispatch(
          setFriends({
            friends: response.data,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const friends = useSelector((state) => state.user.friends);
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

  return (
    <>
      <div className="row d-flex align-items-center">
        <div className="d-flex align-items-center  mt-3">
          <div className="d-flex justify-content-center">
            <h4>Friend List</h4>
          </div>
          <div style={{ marginLeft: "250px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-fill-check"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
            </svg>
          </div>
        </div>
      </div>

      <hr />

      <div className="row">
        {friends
          && friends.map((friend) => {
              return (
                <>
                  <div className="d-flex align-items-center">
                    <div className="m-2  ">
                      <img
                        src={`${friend.picturePath}`}
                        alt="..."
                        style={{
                          width: "75px",
                          height: "75px",
                          borderRadius: "100%",
                        }}
                      />
                    </div>
                    <div className="m-0 p-0">
                      <h5 className="m-0 ">{friend.firstName}</h5>
                      <div>
                        <button
                          style={{ borderRadius: "100%" }}
                          onClick={() =>
                            handleFriend(user.user_id, friend.user_id)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="red"
                            className="bi bi-person-dash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                            />
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          }
      </div>

      <br />
    </>
  );
};

export default RightCard;
