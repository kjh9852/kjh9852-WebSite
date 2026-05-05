export interface Post {
  id: string;
  content: string;
  authorId: string;
  userName?: string | null;
  userImage?: string | undefined;
  createDate: Date;
}

export interface PostProps {
  post: Post | null | undefined;
}

export interface PostDetailProps {
  post?: Post | null | undefined;
  isPending?: boolean;
}

export interface InitialPost {
  content: string;
}
