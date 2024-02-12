"use client";

import {
  SortEnum,
  useGetCategoriesQuery,
  useAddSimpleProductToCartMutation,
} from "@/remote/gql-generated";
import React from "react";

export default function ClientComponent() {
  const { data, isLoading } = useGetCategoriesQuery({
    currentPage: 1,
    pageSize: 48,
    countryCode: "AE",
    filters: {
      category_id: {
        eq: "918",
      },
    },
    sort: {
      position: SortEnum.Asc,
    },
  });

  const {
    data: addtocartdata,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useAddSimpleProductToCartMutation();

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <div className="w-[30%] border-2 border-sky-500 p-4">
      <h3 className="pb-4">Client component</h3>
      {data?.products?.items?.map((item) => (
        <div key={item?.id}>{item?.name}</div>
      ))}

      <button
        onClick={() => {
          mutate({
            cartId: "Aztj3thwIqgYGZfLVDDhmvDSeRkAhyb3",
            quantity: 1,
            sku: "AWL-H002SY2004-A27A",
          });
        }}
      >
        {isPending ? "loading" : "Add product"}
      </button>
    </div>
  );
}
