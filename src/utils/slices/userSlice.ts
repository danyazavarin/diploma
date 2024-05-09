import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

export interface IPayloadAction {
  id: string;
  name: string;
  surname: string;
}

const initialState: { users: IPayloadAction[] } = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signInUser: (state: { users: IPayloadAction[] }, action: PayloadAction<IPayloadAction>) => {
      state.users.push(action.payload);
    },
    signOutUser: (state: { users: IPayloadAction[] }, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
