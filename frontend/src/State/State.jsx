import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      console.log(state.mode);
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user not found");
      }
    },

    setPosts: (state, action) => {
     
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      
        state.posts = [action.payload.post, ...state.posts];
      
    },
    setPostLike: (state, action) => {
    
      console.log("in here", action.payload.updatedPost);
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.updatedPost._id) {
          return action.payload.updatedPost;
        }
        return post;
      });
      state.posts = updatedPost;
    },
    setPostDelete: (state, action) => {
      console.log("post de",action.payload.post._id)
      state.posts=state.posts.filter((post)=>post._id!==action.payload.post._id)
    }
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setPostLike,
  setPostDelete
} = authSlice.actions;
export default authSlice.reducer;
