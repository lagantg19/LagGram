import React from "react";
import { useSelector } from "react-redux";

const Test = () => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <div>
      {posts.map(
        (post) =>
          post._id === "64ba410821f898fedba755fd" &&
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
          ))
      )}
    </div>
  );
};

export default Test;
