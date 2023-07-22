import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostLike } from "../../State/State";

const Modal = ({ id, setShow, show }) => {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handlePost = (text, id) => {
    const comment = text;
    const name = user.firstName;
    const dp = user.picturePath;

    axios
      .patch(
        `http://localhost:4000/posts/${id}/comment`,
        {
          name,
          dp,
          comment,
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
            updatedPost: response.data.updatedPost,
          })
        );
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    setText("");
  };
  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {posts.map((post) => {
                  post._id === id &&
                    post.comments.map((com) => (
                      <div className="col-12 mt-3" key={com}>
                        <div className="d-flex ">
                          <div className="me-2">
                            <img
                              src={com.dp}
                              alt="..."
                              style={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "100%",
                              }}
                            />
                          </div>
                          <div className="d-flex align-items-center me-3">
                            <h5 style={{ fontSize: "20px" }}>
                              <b>{com.name}</b>
                            </h5>
                          </div>
                          <div className="d-flex align-items-center">
                            <h5>{com.comment}</h5>
                          </div>
                        </div>
                      </div>
                    ));
                })}
              </div>
              <hr className="mt-5" />
              <div className="row mt-3">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShow({ status: false, id: null })}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handlePost(text, id)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
