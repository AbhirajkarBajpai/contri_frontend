import { configureStore, createSlice } from '@reduxjs/toolkit';


const UserSlice = createSlice({
  name: 'loggedInUser',
  initialState: { value: null },
  reducers: {
    setUser: (state, _id) => {
      state.value = _id;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
});

// Second Slice: Todos
// const todoSlice = createSlice({
//   name: 'todos',
//   initialState: [],
//   reducers: {
//     addTodo: (state, action) => {
//       state.push({ id: Date.now(), text: action.payload, completed: false });
//     },
//     toggleTodo: (state, action) => {
//       const todo = state.find((t) => t.id === action.payload);
//       if (todo) {
//         todo.completed = !todo.completed;
//       }
//     },
//   },
// });

// Export actions from slices
export const { setUser, removeUser } = UserSlice.actions;
// export const { addTodo, toggleTodo } = todoSlice.actions;

// Configure store with reducers from both slices
const store = configureStore({
  reducer: {
    loggedInUser: UserSlice.reducer,
    // todos: todoSlice.reducer,
  },
});

export default store;
