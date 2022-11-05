import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryState(
  defaultValue: string,
  key: string,
  config: { cleanOnUnmount?: boolean } = { cleanOnUnmount: true }
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(key) || defaultValue);

  useEffect(() => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }, [value, setSearchParams]);

  // clear the query param on unmount
  useEffect(() => {
    return () => {
      if (config.cleanOnUnmount) {
        searchParams.delete(key);
        setSearchParams(searchParams);
      }
    };
  }, []);

  return [value, setValue] as [string, (newValue: string) => void];
}
