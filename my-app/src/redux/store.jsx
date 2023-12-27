import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice";
import basketSlice from "./slices/basketSlice";

const store=configureStore({
    reducer:{
      api:dataSlice,
      baskets:basketSlice,
      
    }
})

export default store