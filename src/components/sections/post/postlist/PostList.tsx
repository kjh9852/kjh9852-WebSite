import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { type PostListProps } from '@/features/post';

import PostItem from '../postItem/PostItem';

import 'swiper/css';
import styles from './PostList.module.scss';

export default function PostList({
  postList,
  onPostDetailOpen,
}: PostListProps) {
  const [swiperMoving, setSwiperMoving] = useState(false);

  if (!postList || postList.length === 0)
    return (
      <div className={styles.emptyWrapper}>
        <p>등록된 게시글이 없습니다.</p>
      </div>
    );

  return (
    <Swiper
      className={styles.customSwiper}
      slidesPerView="auto"
      onSliderFirstMove={() => setSwiperMoving(true)}
      onTransitionEnd={() => setSwiperMoving(false)}
      threshold={10}
      preventClicks={true}
      preventClicksPropagation={true}
      touchStartPreventDefault={false}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }}
    >
      {postList?.map((post) => (
        <SwiperSlide key={post.id}>
          <PostItem
            post={post}
            onClick={() => !swiperMoving && onPostDetailOpen(post.id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
