import { RootState } from './../../app/appStore';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

interface ILoginResponse {
  user: {
    firstName: string;
    lastName: string;
  };
  userToken: string;
}

interface IRegistrationRequest {
  firstName: string;
  lastName: string;
  dateOfBirthday: string;
  email: string;
  password: string;
}

interface IAuthorizationRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'http://127.0.0.1/',
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).userInfo.userToken;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    { maxRetries: 5 },
  ),
  endpoints: (builder) => ({
    authorization: builder.mutation<ILoginResponse, IAuthorizationRequest>({
      query: (credentials) => ({
        url: `authorization`,
        method: 'POST',
        body: credentials,
      }),
    }),
    registration: builder.mutation<ILoginResponse, IRegistrationRequest>({
      query: (credentials) => ({
        url: `registration`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthorizationMutation, useRegistrationMutation } = authApi;
