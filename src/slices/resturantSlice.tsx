import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Resturant } from "../models/resturant.module";

export const resturantApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6780ed7d85151f714b08885a.mockapi.io",
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Headers", "*");
    },
  }),
  tagTypes: ["Resturant"],
  endpoints: (builder) => ({
    getResturants: builder.query<Resturant[], void>({
      query: () => "/resturants",
      providesTags: ["Resturant"],
      transformResponse: (response: Resturant[], args: any) => {
        if (args === 2) {
          return response.slice(0, 4);
        }
        return response;
      },
    }),
    getResturant: builder.query<Resturant[], void>({
      query: (id) =>`/resturants/${id}`,
      providesTags: ["Resturant"],
    }),
    addResturant: builder.mutation<void, Resturant>({
      query: (resturant) => ({
        url: "/resturants",
        method: "POST",
        body: resturant,
      }),
      invalidatesTags: ["Resturant"],
    }),
    deleteResturant: builder.mutation<void, string>({
      query: (id) => ({
        url: `/resturants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resturant"],
    }),
    updateResturant: builder.mutation<void, Resturant>({
      query: ({ id, ...rest }) => ({
        url: `/resturants/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Resturant"],
    }),
  }),
});

export const {
  useGetResturantQuery,
  useGetResturantsQuery,
  useAddResturantMutation,
  useDeleteResturantMutation,
  useUpdateResturantMutation,
} = resturantApi;
