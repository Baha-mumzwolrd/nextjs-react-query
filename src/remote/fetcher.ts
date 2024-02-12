type FetchOptions = {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  isServer?: boolean;
};

type RequestInit = {
  headers: (HeadersInit & FetchOptions) | FetchOptions;
};

function detectGraphQLOperationType(gqlString: string): string {
  // Trim the string to remove leading/trailing whitespaces
  const trimmedString = gqlString.trim();

  // Detect whether it's a Query or Mutation based on the starting keyword
  if (trimmedString.startsWith("query")) {
    return "Query";
  } else if (trimmedString.startsWith("mutation")) {
    return "Mutation";
  } else {
    return "Unknown";
  }
}

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
) => {
  return async (): Promise<TData> => {
    const { next, cache, isServer, ...restOptions } = options || {};

    const queryType = detectGraphQLOperationType(query);
    let res;
    if (queryType === "Mutation") {
      const url = isServer
        ? `${process.env.NEXT_PUBLIC_MAGENTO_BACKEND_URL}graphql`
        : `/graphql`;

      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...restOptions,
        },
        body: JSON.stringify({ query, variables }),
        next,
        cache,
      });
    } else {
      const url = isServer
        ? `${
            process.env.NEXT_PUBLIC_MAGENTO_BACKEND_URL
          }graphql?query=${query}&variables=${JSON.stringify(variables)}`
        : `/graphql?query=${query}&variables=${JSON.stringify(variables)}`;

      const compressedUrl = (url as string)
        .replace(/(%20)+/g, "%20")
        .replace(/\s+/g, " ")
        .trim();

      res = await fetch(compressedUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...restOptions,
        },
        next,
        cache,
      });
    }

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
};
