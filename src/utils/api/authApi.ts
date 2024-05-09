import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'http://',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    { maxRetries: 5 },
  ),
  endpoints: (builder) => ({
    getAuthToken: builder.query<string, string>({
      query: (id) => ({
        url: `kudato/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetAuthTokenQuery} = authApi;