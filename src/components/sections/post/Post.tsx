import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Section from '@/components/layout/section/Section';
import Wrapper from '@/components/layout/wrapper/Wrapper';
import PostList from '@/components/sections/post/postlist/PostList';
import { Button } from '@/components/ui';
import { useAuth } from '@/features/auth';
import { useGetPosts, usePostSubscription } from '@/features/post';
import { useModalStore } from '@/store/modalStore';
import { usePostStore } from '@/store/postStore';

import styles from './Post.module.scss';

export default function Post() {
  usePostSubscription();

  const { data: postList } = useGetPosts();
  const { data: user } = useAuth();
  const { openPost } = usePostStore();
  const [myPost, setMyPost] = useState<boolean>(false);
  const { openModal } = useModalStore();

  const [swiperMoving, setSwiperMoving] = useState(false);

  const filteredPostList = myPost
    ? postList?.filter((post) => post.authorId === user?.uid)
    : postList;

  const handleOpenPost = () => {
    openModal('post');
    openPost('add', '');
  };

  const handlelOpenPostDetail = (id: string) => {
    openModal('post');
    openPost('detail', id);
  };

  return (
    <Section sectionId="post" className="overflow-x-scroll">
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
        <div className={styles.postContainer}>
          <Swiper
            className={styles.customSwiper}
            onSliderFirstMove={() => setSwiperMoving(true)}
            onTransitionEnd={() => setSwiperMoving(false)}
            threshold={10}
            preventClicks={true}
            preventClicksPropagation={true}
            touchStartPreventDefault={false}
            height={1000}
            spaceBetween={50}
            slidesPerView={4}
          >
            {filteredPostList?.map((post) => (
              <SwiperSlide key={post.id}>
                <PostList
                  postList={post}
                  onPostDetailOpen={() =>
                    !swiperMoving && handlelOpenPostDetail(post.id)
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>
    </Section>
  );
}
