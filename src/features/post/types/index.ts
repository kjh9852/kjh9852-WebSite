import type { PostFormValues } from '../schemas/post.schema';

export type Post = {
  id: string;
  content: string;
  authorId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type EditPost = {
  postId: string;
  updatedPost: PostFormValues;
};

export type PostProps = {
  post: Post;
};

export type PostListProps = {
  postList: Post[];
  onPostDetailOpen: (id: string) => void;
};

export type PostDetailProps = {
  post: Post | null | undefined;
  isPending?: boolean;
};

export type PostItemProps = {
  post: Post;
  onClick: () => void;
};
