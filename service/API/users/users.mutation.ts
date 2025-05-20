import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError } from '@/types/request.types';
import { mutationData } from '@/config/request';
import { CreateUserBody } from '@/types/users.types';

interface MutationUserOptions {
  options?: UseMutationOptions<any, ApiError, CreateUserBody | { id: string }>;
  params?: { [key: string]: any };
}

export function CreateNewUser({ options }: MutationUserOptions) {
  return useMutation<any, ApiError, CreateUserBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'users',
        method: 'POST',
        body: {
          ...body,
        },
      });
    },
    ...options,
  });
}

export function DeleteUser({ options }: MutationUserOptions) {
  return useMutation<any, ApiError, { id: string }>({
    mutationFn: async (body) => {
      return await mutationData({
        url: `users/${body?.id}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
