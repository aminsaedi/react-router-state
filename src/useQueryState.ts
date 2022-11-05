import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryState(defaultValue: string, key: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(key) || defaultValue);

  useEffect(() => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }, [value, setSearchParams]);

  return [value, setValue] as [string, (newValue: string) => void];
}
