import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  allProperty: [],
  filter: 'all',
  allPgProperty: [],
  allRentProperty: []
};

export const userProperty = createSlice({
  name: "property",
  initialState,
  reducers: {
    setAllUserPgProperty: (state, action) => {
      state.allPgProperty = action.payload;
      state.allProperty = [...state.allPgProperty, ...state.allRentProperty];
    },
    setAllUserRentProperty: (state, action) => {
      state.allRentProperty = action.payload;
      state.allProperty = [...state.allPgProperty, ...state.allRentProperty];
    },
    filterPropertyByQuery: (state, action) => {
     
      const query = action.payload;
      // console.log('state query',query)
      if(query==='all') {
        state.allProperty = [...state.allPgProperty, ...state.allRentProperty];
      }else if(query==='pg'){
        state.allProperty = state.allPgProperty;
      }else{
        state.allProperty = state.allRentProperty;
      }
       
      },

    changeStatusOfProperty:(state,action)=>{
      const id=action.payload

      state.allProperty.forEach((property)=>{
        if(property._id===id){
          property.isPropertyActive=!property.isPropertyActive
        }
      })
    },

    deleteUserProperty:(state,action)=>{
      const id=action.payload;
     state.allProperty= state.allProperty.filter((property)=>property._id!==id)
    },

    clearStateOfUser:(state)=>{
      
        state.allPgProperty=[]
        state.allRentProperty=[]
        state.allProperty=[]
    }
     
    
  },
});

// Export the actions
export const {clearStateOfUser, setAllUserProperty,setAllUserPgProperty, setAllUserRentProperty, filterPropertyByQuery,changeStatusOfProperty,deleteUserProperty } = userProperty.actions;

// Export the reducer
export default userProperty.reducer;


// Export the actions
// export const { setAllUserProperty } = userProperty.actions;




// // Selectors
// export const selectFilteredProperties = (state) => {
//   const filter = state.property.filter;
//   const properties = state.property.userAllProperty;

//   switch (filter) {
//     case "pg":
//       return properties.filter(property => property.type === "pg");
//     case "rental":
//       return properties.filter(property => property.type === "rental");
//     default:
//       return properties; // 'all' or undefined case, return all properties
//   }
// };
