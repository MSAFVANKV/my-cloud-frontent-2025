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

export const useQueryData = <T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  enabled: boolean = true
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery<T>({
    queryKey,
    queryFn,
    enabled,
  });

  return { data, isPending, isFetched, refetch, isFetching };
};
