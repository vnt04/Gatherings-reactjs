import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers/allReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
