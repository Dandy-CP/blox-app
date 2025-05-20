import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/config/request';
import { ApiError } from '@/types/request.types';
import { PostResponse } from '@/types/post.types';

interface GetUserOptions {
  options?: UseQueryOptions<PostResponse, ApiError>;
  params?: { [key: string]: any };
}

export function GetListPost({ options, params }: GetUserOptions) {
  return useQuery<PostResponse, ApiError>({
    queryKey: ['posts'],
    queryFn: async () => {
      return await fetchData({
        url: 'posts',
        inputParams: {
          page: params?.page ?? 1,
          per_page: params?.per_page ?? 10,
          title: params?.title ?? '',
        },
      });
    },
    ...options,
  });
}
