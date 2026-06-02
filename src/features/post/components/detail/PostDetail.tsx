import { useQueryClient } from '@tanstack/react-query';

import { Dropdown, DotMenu, Loading } from '@/components/ui';
import { useAuth, useUserMetaData } from '@/features/auth';
import useToggle from '@/hooks/useToggle';
import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';
import { useToastStore } from '@/store/toastStore';
import convertTime from '@/utils/convertTime';

import { useDeletePost } from '../../hooks/useDeletePost';
import { type PostDetailProps } from '../../types';

import styles from './PostDetail.module.scss';

export default function PostDetail({ post, isPending }: PostDetailProps) {
  const { data: user } = useAuth();
  const { data: author } = useUserMetaData(post?.authorId || '');
  const { mutate: deletePost } = useDeletePost();
  const closeModal = useModalStore((state) => state.closeModal);
  const openPost = usePostStore((state) => state.openPost);
  const closePost = usePostStore((state) => state.closePost);
  const showToast = useToastStore((state) => state.showToast);
  const [postMenuOpen, togglePostMenu, setPostMenuOpen] = useToggle(false);

  const queryClient = useQueryClient();

  if (!post || isPending)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );

  const handleEditModalOpen = () => {
    openPost('edit', post.id);
  };

  const handleDeletePost = () => {
    deletePost(post.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['post'],
        });
        queryClient.removeQueries({
          queryKey: ['post', post.id],
        });
        showToast({ type: 'success', message: '포스트가 삭제되었습니다.' });
        closePost();
        closeModal();
      },
      onError: (error: Error) => {
        const message = error.message ?? '삭제에 실패하였습니다.';
        showToast({ type: 'warning', message: message });
      },
    });
  };

  const POST_MENU = [
    {
      label: '수정하기',
      value: 'edit',
    },
    {
      label: '삭제하기',
      value: 'remove',
    },
  ] as const;

  return (
    <div className={styles.container}>
      <div className={styles.dropdownWrapper}>
        {user && post?.authorId === user.uid && (
          <Dropdown
            dropdownList={POST_MENU}
            isOpen={postMenuOpen}
            setOpen={setPostMenuOpen}
            onSelect={(value) => {
              if (value === 'edit') handleEditModalOpen();
              if (value === 'remove') handleDeletePost();
            }}
          >
            <DotMenu onUserAction={togglePostMenu} />
          </Dropdown>
        )}
      </div>
      <div className={styles.authorContainer}>
        <p className={styles.content}>{post?.content}</p>
        <div className={styles.userInfo}>
          <img
            className={styles.userImage}
            src={author?.photoURL}
            alt="이미지"
          />
          <p className={styles.userName}>{author?.displayName}</p>
          <span className={styles.pipeLine} />
          <p>{convertTime(post.createDate)}</p>
        </div>
      </div>
    </div>
  );
}
