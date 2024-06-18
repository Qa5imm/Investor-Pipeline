// @ts-nocheck

import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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

  if (isLoading) return <div className="m-auto my-24 w-fit">Loading...</div>;
  if (isError)
    return (
      <div className="m-auto w-fit text-red-500 my-24">An Error Occured!</div>
    );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export default StateProvider;
