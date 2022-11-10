import * as React from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryState(key: string, defaultValue: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = JSON.stringify({ data: searchParams.get(key) });
  const [value, setValue] = React.useState(
    defaultValue ? JSON.stringify({ data: defaultValue }) : queryValue
  );

  const onSetValue = React.useCallback(
    (newValue: any): React.Dispatch<React.SetStateAction<string>> => {
      if (typeof newValue !== "function") {
        const stringified = JSON.stringify({ data: newValue });
        setValue(stringified);
        searchParams.set(key, stringified);
        setSearchParams(searchParams);
      } else {
        const stringified = JSON.stringify({ data: newValue(value) });
        setValue(stringified);
        searchParams.set(key, stringified);
        setSearchParams(searchParams);
      }
      return;
    },
    [key]
  );

  React.useEffect(() => {
    if (value !== queryValue) {
      setValue(queryValue || JSON.stringify({ data: defaultValue }));
    }
  }, [queryValue]);

  return [value, onSetValue];
}
