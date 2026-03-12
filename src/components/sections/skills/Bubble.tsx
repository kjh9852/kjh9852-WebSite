import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { bubbleColor } from '@/components/sections/skills/bubbleColor';

import styles from './Bubble.module.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Bubble() {
  const container = useRef<HTMLDivElement | null>(null);

  const scrollTl = useRef<gsap.core.Timeline | null>(null);
  const bubbleTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      bubbleTl.current = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        },
      });

      bubbleColor.forEach(({ name }) => {
        bubbleTl.current?.to(
          `.${name}`,
          {
            y: () => gsap.utils.random(30, 55),
            duration: () => gsap.utils.random(1, 3),
            delay: () => gsap.utils.random(0, 1.5),
          },
          0
        );
      });

      scrollTl.current = gsap
        .timeline({
          paused: false,
          repeat: 0,
          defaults: {
            duration: 5,
          },
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: '40% 50%',
            immediateRender: false,
            invalidateOnRefresh: true,
            scrub: 5,
            onEnter: () => {
              bubbleTl.current?.play();
            },
            onLeaveBack: () => {
              bubbleTl.current?.pause();
            },
          },
        })
        .to(`.${styles.skillInfo}`, {
          y: 0,
          ease: 'power3.out',
        })
        .to(`.${styles.water}`, { y: 80 }, '<0.5');
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <ul className={styles.skillInfo}>
        {bubbleColor.map((item) => (
          <li key={item.id} className={`${styles.chart} ${item.name} bubbles`}>
            <div className={styles.circle}>
              <div
                className={`${styles.water} ${styles[item.name]} water`}
                data-color={item.mainColor}
                data-class={item.name}
              >
                <span className={styles.skillText}>{item.text}</span>
                <svg
                  version="1.1"
                  id="레이어_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 440 200"
                >
                  <path
                    fill={item.subColor}
                    className="st0"
                    d="M300.9,146C214,115.9,59.5,62.6-41.9,62.6c-101.4,0-255.9,53.2-342.8,83.4c-41.2,14.3-81.4,24.1-135.3,24.6
                     c-53.9-0.4-94.1-10.3-135.3-24.6c-87-30.1-241.4-83.3-342.8-83.4c-101.4,0-255.9,53.2-342.8,83.4c-42.1,14.6-83.3,24.6-139.1,24.6
                     V200h956.2h7.5H440v-29.4C384.2,170.6,343.1,160.6,300.9,146z"
                  />
                </svg>
                <svg
                  version="1.1"
                  id="레이어_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 440 200"
                >
                  <path
                    fill={item.mainColor}
                    className="st0"
                    d="M1539.9,146c-87-30.1-241.4-83.3-342.8-83.4c-101.4,0-255.9,53.2-342.8,83.4c-41.2,14.3-81.4,24.1-135.3,24.6
                     c-53.9-0.4-94.1-10.3-135.3-24.6c-87-30.1-241.4-83.3-342.8-83.4C139.5,62.6-15,115.9-101.9,146c-41.8,14.5-82.5,24.4-137.6,24.6
                     c-55-0.2-95.8-10.1-137.6-24.6c-87-30.1-241.4-83.3-342.8-83.4c-101.4,0-255.9,53.2-342.8,83.4c-41.2,14.3-81.4,24.1-135.3,24.6
                     c-53.9-0.4-94.1-10.3-135.3-24.6c-87-30.1-241.4-83.3-342.8-83.4c-101.4,0-255.9,53.2-342.8,83.4c-42.1,14.6-83.3,24.6-139.1,24.6
                     V200h956.2h7.5H-241h2h953.2h7.5H1679v-29.4C1623.2,170.6,1582.1,160.6,1539.9,146z"
                  />
                </svg>
              </div>
              <div className={styles.bgBubble}></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
