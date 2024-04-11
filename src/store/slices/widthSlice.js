import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
    width: null,
} 

const widthSlice = createSlice({ 
    name: 'width', 
    initialState, 
    reducers: { 
        setWidth: (state, action) => { 
            state.width = action.payload 
        }, 
    } 
}) 

export const {setWidth} = widthSlice.actions 

export default widthSlice.reducer