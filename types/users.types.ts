import { Pagination } from './meta.types';

export interface UsersResponse {
  data: Users[];
  meta: Pagination;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
}

export interface CreateUserBody {
  name: string;
  email: string;
  gender: string;
  status: string;
}
