// @ts-nocheck

import { createContext, useEffect, useState } from "react";
import useDealsQuery from "../hooks/useDealsQuery";

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

  const [deals, setDeals] = useState(data);

  useEffect(() => {
    setDeals(data);
  }, [data]);

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

  if (isLoading) return <div className="m-auto my-24 w-fit">Loading...</div>;
  if (isError)
    return <div className="m-auto w-fit text-red-500 my-24">An Error Occured!</div>;

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export default StateProvider;
