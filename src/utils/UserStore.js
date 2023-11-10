import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice.js'
export default configureStore({
    reducer : {
        user : UserReducer
    }
})