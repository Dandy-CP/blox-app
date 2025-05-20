import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError } from '@/types/request.types';
import { mutationData } from '@/config/request';
import { CreatePostBody } from '@/types/post.types';

interface MutationUserOptions {
  options?: UseMutationOptions<any, ApiError, CreatePostBody>;
  params?: { [key: string]: any };
}

export function CreateNewPost({ options }: MutationUserOptions) {
  return useMutation<any, ApiError, CreatePostBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: `users/${body.user_id}/posts`,
        method: 'POST',
        body: {
          ...body,
        },
      });
    },
    ...options,
  });
}
