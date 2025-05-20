import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/config/request';
import { ApiError } from '@/types/request.types';
import { UsersResponse } from '@/types/users.types';

interface GetUserOptions {
  options?: UseQueryOptions<UsersResponse, ApiError>;
  params?: { [key: string]: any };
}

export function GetListUsers({ options, params }: GetUserOptions) {
  return useQuery<UsersResponse, ApiError>({
    queryKey: ['users'],
    queryFn: async () => {
      return await fetchData({
        url: 'users',
        inputParams: {
          page: params?.page ?? 1,
          per_page: params?.per_page ?? 10,
          gender: params?.gender ?? '',
          status: params?.status ?? '',
          name: params?.search ?? '',
        },
      });
    },
    ...options,
  });
}
