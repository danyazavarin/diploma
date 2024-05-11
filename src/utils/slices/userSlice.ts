import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

type IUser = {
  firstName: string;
  lastName: string;
};

export interface IUserInfo {
  user: IUser;
  userToken: string;
}

const initialState: IUserInfo = {
  user: {
    firstName: '',
    lastName: '',
  },
  userToken: '',
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    signInUser: (
      state: IUserInfo,
      {
        payload: {
          user: { firstName, lastName },
          userToken,
        },
      }: PayloadAction<IUserInfo>,
    ) => {
      state.user.firstName = firstName;
      state.user.lastName = lastName;
      state.userToken = userToken;
    },
    signOutUser: (state: IUserInfo) => {
      state.user.firstName = '';
      state.user.lastName = '';
      state.userToken = '';
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
