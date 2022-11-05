import * as React from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryState(
  key: string,
  defaultValue: string,
  config: { cleanOnUnmount?: boolean } = { cleanOnUnmount: false }
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get(key);
  const [value, setValue] = React.useState<string>(queryValue || defaultValue);

  const onSetValue = React.useCallback(
    (newValue: any): React.Dispatch<React.SetStateAction<string>> => {
      if (typeof newValue === "string") {
        setValue(newValue);
        searchParams.set(key, newValue);
        setSearchParams(searchParams);
      } else if (typeof newValue === "function") {
        const result = newValue(value);
        setValue(result);
        searchParams.set(key, result);
        setSearchParams(searchParams);
      }
      return;
    },
    [key]
  );

  React.useEffect(() => {
    if (value !== queryValue) {
      setValue(queryValue || defaultValue);
    }
  }, [queryValue]);

  return [value, onSetValue];
}
