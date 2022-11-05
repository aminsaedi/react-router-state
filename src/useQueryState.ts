import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryState(
  key: string,
  defaultValue: string,
  config: { cleanOnUnmount?: boolean } = { cleanOnUnmount: false }
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get(key);
  const [value, setValue] = useState(queryValue || defaultValue);

  const onSetValue = useCallback(
    (newValue) => {
      setValue(newValue);
      searchParams.set(key, newValue);
      setSearchParams(searchParams);
    },
    [key]
  );

  useEffect(() => {
    if (value !== queryValue) {
      setValue(queryValue || defaultValue);
    }
  }, [queryValue]);

  return [value, onSetValue] as [string, (newValue: string) => void];
}
