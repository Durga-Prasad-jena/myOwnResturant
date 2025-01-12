import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Resturant } from "../models/resturant.module";
import { Cuisines } from "../models/cuisines.module";

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
    getCuisines: builder.query<Cuisines[], void>({
      query: () => "/cuisines",
      transformResponse: (response: Cuisines[], args: any) => {
        if (args === 2) {
          return response.slice(0, 4);
        }
        return response;
      },
     
    }),
    getCuisine: builder.query<Cuisines[], void>({
      query: (id) =>`/cuisines/${id}`,
    }),
    addCuisines: builder.mutation<void, Cuisines>({
      query: (cuisine) => ({
        url: "/cuisines",
        method: "POST",
        body: cuisine,
      }),
      invalidatesTags: ["Resturant"],
    }),
    deleteCuisines: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cuisines/${id}`,
        method: "DELETE",
      }),
    }),
    updateCuisines: builder.mutation<void, Cuisines>({
      query: ({ id, ...rest }) => ({
        url: `/cuisines/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
  }),
});

export const {
  useGetResturantQuery,
  useGetResturantsQuery,
  useAddResturantMutation,
  useDeleteResturantMutation,
  useUpdateResturantMutation,
  useGetCuisinesQuery,
  useDeleteCuisinesMutation,
  useAddCuisinesMutation,
  useGetCuisineQuery,
  useUpdateCuisinesMutation
} = resturantApi;
