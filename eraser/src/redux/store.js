import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer.js";
import teamReducer from "./reducers/team.reducer.js";
import fileReducer from "./reducers/file.reducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    team:teamReducer,
    file:fileReducer,
  },
});

export default store;
