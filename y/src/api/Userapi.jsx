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
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),
    verifyOtp : builder.mutation({
      query : (otpData) =>({
        url:'/verify-otp',
        method :'POST',
        body:otpData
      }),
    }),
    resendOtp:builder.mutation({
      query:(emailData)=>({
        url:'/resend-otp',
        method: 'POST',
        body:emailData
      })
    })
  }),
});

export const { useRegisterPostMutation,useVerifyOtpMutation ,useResendOtpMutation} = UserApislice;