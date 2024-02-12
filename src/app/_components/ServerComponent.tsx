import { serverFetch } from "@/remote/serverFetcher";
import { SortEnum, useGetCategoriesQuery } from "@/remote/gql-generated";

export default async function ServerComponent({ title }: any) {
  const { products } = await serverFetch(useGetCategoriesQuery, {
    variables: {
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
    },
    // next: { revalidate: 6000 },
    // cache: "no-store",
  });

  return (
    <div className="w-[30%] border-white-2 border-2 border-sky-500 p-4">
      <h3 className="pb-4">{title}</h3>
      {products?.items?.map((item) => (
        <div key={item?.id}>{item?.name}</div>
      ))}
    </div>
  );
}
