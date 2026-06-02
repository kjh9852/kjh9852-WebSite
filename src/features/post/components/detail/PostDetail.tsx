import defaultProfile from '@/assets/icons/profile_icon.png';
import { Dropdown, DotMenu, Loading } from '@/components/ui';
import { useAuth, useUserMetaData } from '@/features/auth';
import useToggle from '@/hooks/useToggle';
import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';
import { useToastStore } from '@/store/toastStore';
import convertTime from '@/utils/convertTime';

import { useDeletePost } from '../../hooks/useDeletePost';
import type { PostDetailProps } from '../../types';

import styles from './PostDetail.module.scss';

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

export default function PostDetail({ post, isPending }: PostDetailProps) {
  const { data: user } = useAuth();
  const authorId = post?.authorId ?? '';
  const { data: author } = useUserMetaData(authorId);
  const { mutate: deletePost } = useDeletePost();
  const closeModal = useModalStore((state) => state.closeModal);
  const openPost = usePostStore((state) => state.openPost);
  const closePost = usePostStore((state) => state.closePost);
  const showToast = useToastStore((state) => state.showToast);
  const [postMenuOpen, togglePostMenu, setPostMenuOpen] = useToggle(false);

  if (!post || isPending)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );

  const isAuthor = authorId === user?.uid;

  const handleEditModalOpen = () => {
    openPost('edit', post.id);
  };

  const handleDeletePost = () => {
    deletePost(post.id, {
      onSuccess: () => {
        showToast({ type: 'success', message: '포스트가 삭제되었습니다.' });
        closePost();
        closeModal();
      },
      onError: (error: Error) => {
        const message = error.message || '삭제에 실패하였습니다.';
        showToast({ type: 'warning', message: message });
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdownWrapper}>
        {isAuthor && (
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
        <p className={styles.content}>{post.content}</p>
        <div className={styles.userInfo}>
          <img
            className={styles.userImage}
            src={author?.photoURL || defaultProfile}
            alt={`${author?.displayName || '사용자'} 프로필 이미지`}
            loading="lazy"
          />
          <p className={styles.userName}>{author?.displayName}</p>
          <span className={styles.pipeLine} />
          <p>{post.createdAt ? convertTime(post.createdAt) : '처리 중'}</p>
        </div>
      </div>
    </div>
  );
}
