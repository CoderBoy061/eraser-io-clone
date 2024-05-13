import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  GET_TEAM_FAILURE,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
} from "../constants/team.constant";
import { CLEAR_ERRORS } from "../constants/auth.constant";

const initialState = {
  teams: [],
  error: null,
  loading: false,
  message: null,
  error: null,
};

const teamReducer = createReducer(initialState, (builder) => {
  builder.addCase(CREATE_TEAM_REQUEST, (state, action) => {
    state.loading = true;
  });
  builder.addCase(CREATE_TEAM_SUCCESS, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase(CREATE_TEAM_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase(GET_TEAM_REQUEST, (state, action) => {
    state.loading = true;
  });
  builder.addCase(GET_TEAM_SUCCESS, (state, action) => {
    console.log(action.payload);
    state.loading = false;
    state.teams = action.payload;
  });
  builder.addCase(GET_TEAM_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase(CLEAR_ERRORS, (state, action) => {
    state.error = null;
    state.message = null;
  });
});

export default teamReducer;
