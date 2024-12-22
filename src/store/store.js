import { configureStore, createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'loggedInUser',
  initialState: { value: null },
  reducers: {
    setUser: (state, _id) => {
      state.value = _id.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
});

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    name:null,
    email:null,
    PhoneNo:null,
    UpiId:null,
  },
  reducers: {
    setDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.PhoneNo = action.payload.phoneNo;
      state.UpiId = action?.payload?.UpiId || null;
    },
  },
});

const userGroupsSlice = createSlice({
  name: 'userGroups',
  initialState: {
    groups: [], 
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    // remove a group by its ID
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    // update a group by its ID
    updateGroup: (state, action) => {
      const index = state.groups.findIndex(group => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = { ...state.groups[index], ...action.payload.updates };
      }
    },
  },
});


const groupDataSlice = createSlice({
  name: 'groupData',
  initialState: {
    groupData: null, 
  },
  reducers: {
    setGroupData: (state, action) => {
      state.groupData = action.payload;
    },
    clearGroupData: (state) => {
      state.groupData = null;
    },
  },
});

// Export actions from slices
export const { setUser, removeUser } = userSlice.actions;
export const { setDetails } = userDetailsSlice.actions;
export const { setGroups, addGroup, removeGroup, updateGroup } = userGroupsSlice.actions;
export const { setGroupData, clearGroupData } = groupDataSlice.actions;

// Configure store with reducers from slices
const store = configureStore({
  reducer: {
    loggedInUser: userSlice.reducer,
    userDetail: userDetailsSlice.reducer,
    userGroups: userGroupsSlice.reducer,
    groupData:groupDataSlice.reducer,
  },
});

export default store;
