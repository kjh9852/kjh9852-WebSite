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
