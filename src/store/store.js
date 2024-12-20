import { configureStore, createSlice } from '@reduxjs/toolkit';


const UserSlice = createSlice({
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

const UserDetailsSlice = createSlice({
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

// Export actions from slices
export const { setUser, removeUser } = UserSlice.actions;
export const { setDetails } = UserDetailsSlice.actions;

// Configure store with reducers from slices
const store = configureStore({
  reducer: {
    loggedInUser: UserSlice.reducer,
    userDetail: UserDetailsSlice.reducer,
  },
});

export default store;
