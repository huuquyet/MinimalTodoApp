import React from "react";
import { createSlice } from "@reduxjs/toolkit";

import { modes } from "../common/constants";

const initialState = {
  scheme: modes.DARK,
};

const modesSlice = createSlice({
  name: "modes",
  initialState,
  reducers: {
    modesChanged(state) {
      state.scheme = state.scheme === modes.DARK ? modes.LIGHT : modes.DARK;
    },
  },
});

export const { modesChanged } = modesSlice.actions;

export default modesSlice.reducer;
