import { useRef } from 'react';

import convertTime from '@/utils/convertTime';

import styles from './PostList.module.scss';

interface PostList {
  id: string;
  content: string;
  authorId: string;
  userName?: string | null;
  userImage?: string | undefined;
  createDate: Date;
}

interface PostListProps {
  postList: PostList;
  onPostDetailOpen: () => void;
}

export default function NotePaper({
  postList,
  onPostDetailOpen,
}: PostListProps) {
  const contentRef = useRef(null);

  return (
    <div
      ref={contentRef}
      className={styles.contentContainer}
      role="button"
      onClick={onPostDetailOpen}
    >
      <div className={styles.notePaperImage}>
        <p className={styles.content}>{postList.content}</p>
        <div className={styles.userContainer}>
          {postList?.userImage && (
            <img
              className={styles.userImage}
              src={postList?.userImage}
              alt="이미지"
            />
          )}
          <div className={styles.notePaper} />
          <div className={styles.userInfo}>
            <p>{postList.userName}</p>
            <span className={styles.pipeLine} />
            <p>{convertTime(postList.createDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
