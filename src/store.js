import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account/AccountSlicer";
import customerReducer from "./features/customer/CustomerSlice";
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
