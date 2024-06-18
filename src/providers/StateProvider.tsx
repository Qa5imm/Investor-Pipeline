// @ts-nocheck

import { createContext, useEffect, useMemo, useState } from "react";
import useDealsQuery from "../hooks/useDealsQuery";
import LoadingSpinner from "../components/LoadingSpinner";

export const AppContext = createContext(null);

function StateProvider({ children }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useDealsQuery();

  const formattedData = useMemo(
    () => data?.pages.map((page) => page.data.map((deal) => deal)).flat(),
    [data]
  );
  const [deals, setDeals] = useState(formattedData);

  useEffect(() => {
    setDeals(formattedData);
  }, [formattedData]);

  const updateDeals = (updatedDeals) => {
    setDeals(updatedDeals);
  };

  const context = {
    deals,
    updateDeals,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-screen items-center">
        <LoadingSpinner />
      </div>
    );

  // Display fetchNextPageError if the next page fetch fails, avoiding the general error message
  if (isError && !isFetchNextPageError)
    return (
      <div className="flex justify-center h-screen items-center text-red-500">
        An Error Occured...
      </div>
    );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export default StateProvider;
