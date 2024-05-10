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
      baseUrl: 'http://',
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).userInfo.user;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    { maxRetries: 5 },
  ),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, IRegistrationRequest | IAuthorizationRequest>({
      query: (credentials) => ({
        url: `login`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
