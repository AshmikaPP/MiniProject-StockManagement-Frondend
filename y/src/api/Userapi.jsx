import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseurluser = "http://localhost:3000"

const baseQuery = fetchBaseQuery({
  baseUrl: baseurluser,  
  credentials: "include",
});

export const UserApislice = createApi({
  reducerPath: "userapi",
  baseQuery,
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    registerPost: builder.mutation({
      query: (formData) => ({
        url: "http://localhost:3000/register",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterPostMutation } = UserApislice;