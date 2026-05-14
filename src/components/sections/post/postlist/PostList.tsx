import { useRef } from 'react';

import defaultProfile from '@/assets/icons/profile_icon.png';
import { useUserMetaData } from '@/features/auth';
import { type PostListProps } from '@/features/post/types';
import convertTime from '@/utils/convertTime';

import styles from './PostList.module.scss';

export default function PostList({
  postList,
  onPostDetailOpen,
}: PostListProps) {
  const contentRef = useRef(null);
  const { data: author } = useUserMetaData(postList.authorId);

  return (
    <div
      ref={contentRef}
      className={styles.contentContainer}
      role="button"
      onClick={onPostDetailOpen}
    >
      <div className={styles.notePaperImage}>
        <p className={styles.content}>{postList.content}</p>
        {author && (
          <div className={styles.userContainer}>
            <img
              className={styles.userImage}
              src={author?.photoURL || defaultProfile}
              alt="유저 이미지"
            />
            <div className={styles.userInfo}>
              <p>{author?.displayName}</p>
              <span className={styles.pipeLine} />
              <p>{convertTime(postList.createDate)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
