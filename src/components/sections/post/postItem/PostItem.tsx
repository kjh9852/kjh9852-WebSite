import defaultProfile from '@/assets/icons/profile_icon.png';
import { useUserMetaData } from '@/features/auth';
import type { PostItemProps } from '@/features/post/types';
import convertTime from '@/utils/convertTime';

import styles from './PostItem.module.scss';

export default function PostItem({ post, onClick }: PostItemProps) {
  const { data: author } = useUserMetaData(post.authorId);

  return (
    <div className={styles.contentContainer} role="button" onClick={onClick}>
      <div className={styles.notePaperImage}>
        <p className={styles.content}>{post.content}</p>
        {author && (
          <div className={styles.userContainer}>
            <img
              className={styles.userImage}
              src={author.photoURL || defaultProfile}
              alt={`${author.displayName || '사용자'} 프로필 이미지`}
              loading="lazy"
            />
            <div className={styles.userInfo}>
              <p>{author.displayName}</p>
              <span className={styles.pipeLine} />
              <p>{post.createdAt ? convertTime(post.createdAt) : '처리중'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
