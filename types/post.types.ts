import { Pagination } from './meta.types';

export interface PostResponse {
  data: Post[];
  meta: Pagination;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface CreatePostPayload {
  user_id: string;
  title: string;
  body: string;
}

export interface CreatePostBody {
  user_id: string;
  title: string;
  body: string;
}
