import {createSlice} from '@reduxjs/toolkit'
export let UserSlice = createSlice({
    name : 'user',
    initialState : {
        username : JSON.parse(localStorage.getItem("username")) || null,
        photo : JSON.parse(localStorage.getItem("photo")) || null
    },
    reducers : {
        LOGIN : (state,action ) => {
            state.username = action.payload.username,
            state.photo = action.payload.photo
            localStorage.setItem("username",JSON.stringify(action.payload.username))
            localStorage.setItem("photo",JSON.stringify(action.payload.photo))
        },
        LOGOUT : (state,action) => {
            localStorage.removeItem("username")
            localStorage.removeItem("photo")
        }
    }
})
export let {LOGIN,LOGOUT} = UserSlice.actions;
export default UserSlice.reducer;
