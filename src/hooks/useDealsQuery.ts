//@ts-nocheck

import { useInfiniteQuery } from "@tanstack/react-query";

export default function useDealsQuery() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      if (pages.length < 3) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  };
}

function fetchDeals({ pageParam }) {
  return fetch(
    `http://localhost:7000/deals/?_per_page=5&_page=${pageParam}`
  ).then((data) => data.json());
}
