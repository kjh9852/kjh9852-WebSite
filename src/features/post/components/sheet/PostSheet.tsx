import { usePostStore } from '@/store/postStore';

import { useGetPost } from '../../hooks/useGetPost';
import AddPost from '../add/AddPost';
import PostDetail from '../detail/PostDetail';
import EditPost from '../edit/EditPost';

export default function PostSheet() {
  const type = usePostStore((state) => state.type);
  const postId = usePostStore((state) => state.postId);
  const { data: post, isPending } = useGetPost(postId ?? '');

  return (
    <>
      {type === 'add' && <AddPost key="add" />}
      {type === 'edit' && post && <EditPost post={post} />}
      {type === 'detail' && <PostDetail post={post} isPending={isPending} />}
    </>
  );
}
