import { useState } from 'react';

import Section from '@/components/layout/section/Section';
import Wrapper from '@/components/layout/wrapper/Wrapper';
import PostList from '@/components/sections/post/postlist/PostList';
import { Button, Loading } from '@/components/ui';
import { useAuth } from '@/features/auth';
import { useGetPosts, usePostSubscription } from '@/features/post';
import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';

import styles from './Post.module.scss';

export default function Post() {
  const { initialized } = usePostSubscription();
  const { data: postList } = useGetPosts();
  const { data: user } = useAuth();
  const { openPost } = usePostStore();
  const [myPost, setMyPost] = useState<boolean>(false);

  const currentPosts = postList ?? [];

  const filteredPostList = myPost
    ? currentPosts.filter((post) => post.authorId === user?.uid)
    : currentPosts;

  const handleOpenPost = () => {
    openModal('post');
    openPost('add', '');
  };

  const handlelOpenPostDetail = (id: string) => {
    openModal('post');
    openPost('detail', id);
  };

  return (
    <Section sectionId="post">
      <Wrapper full>
        {user && (
          <div className={styles.buttonContainer}>
            <Button size="small" onButtonClick={() => handleOpenPost()}>
              게시글 등록
            </Button>
            <Button
              size="small"
              onButtonClick={() => setMyPost((prev) => !prev)}
            >
              {myPost ? '전체 게시글' : '내 게시글 '}
            </Button>
          </div>
        )}
        {!initialized ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : (
        <div className={styles.postContainer}>
                <PostList
              postList={filteredPostList}
              onPostDetailOpen={handleOpenPostDetail}
                />
        </div>
        )}
      </Wrapper>
    </Section>
  );
}
