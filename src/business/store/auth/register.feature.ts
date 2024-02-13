import { IinputValueRegister } from "../../../types/interface/register.interface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReduxState } from "../store"


const initialState: IinputValueRegister = {
  username: "",
  password: "",
  confirmpassword: "",
  name: "",
  surname: "",
  role: "",
  email: "",
  telephone: "",

}

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setStoreRegister: (state, action: PayloadAction<IinputValueRegister>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.confirmpassword = action.payload.confirmpassword;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.telephone = action.payload.telephone;
    }
  }
})

export const registerSelector = (state: ReduxState) => state.register;
