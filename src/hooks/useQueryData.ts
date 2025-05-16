// import {
//   // Enabled,
//   QueryFunction,
//   QueryKey,
//   useQuery,
// } from '@tanstack/react-query'

// export const useQueryData = (
//   queryKey: QueryKey,
//   queryFn: QueryFunction,
//   // enabled?: Enabled
//   enabled: boolean = true 
// ) => {
//   const { data, isPending, isFetched, refetch, isFetching } = useQuery({
//     queryKey,
//     queryFn,
//     enabled
//   })
//   return { data, isPending, isFetched, refetch, isFetching }
// }
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

type UseQueryDataOptions = {
  enabled?: boolean;
  disableRefetch?: boolean;
};

export const useQueryData = <T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  options?: UseQueryDataOptions
) => {
  const { enabled = true, disableRefetch = false } = options ?? {};

  const { data, isPending, isFetched, refetch, isFetching } = useQuery<T>({
    queryKey,
    queryFn,
    enabled,
    refetchOnWindowFocus: !disableRefetch, // ✅ uses your custom flag
  });

  return {
    data,
    isPending,
    isFetched,
    refetch,
    isFetching,
  };
};