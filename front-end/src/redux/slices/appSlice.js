import {createSlice} from "@reduxjs/toolkit";

// import {dispatch} from "../store";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED MESSAGE, SHARED DATA
    linkSelected: 0,
  }
}

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle Sidebar
    ToggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    UpdateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    UpdateSidebarLink(state, action) {
      state.sidebar.linkSelected = action.payload.linkSelected;
    }
  }
});

export const { ToggleSidebar, UpdateSidebarLink, UpdateSidebarType} = slice.actions;

export default slice.reducer;

//

