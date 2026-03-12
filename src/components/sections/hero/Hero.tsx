import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { heroAnimation } from '@/animations/heroAnimation';
import { animationTrigger } from '@/animations/heroAnimationTrigger';
import BackLight01 from '@/assets/images/back_light01.png';
import BackLight02 from '@/assets/images/back_light02.png';
import Moon from '@/assets/images/moon.png';
import MountainBackground from '@/assets/images/mountain_back01.png';
import MountainBack from '@/assets/images/mountain_back02.svg';
import MountainFront from '@/assets/images/mountain_front01.png';
import River from '@/assets/images/river.svg';
import HeroSvg from '@/components/sections/hero/HeroSvg';

import styles from './Hero.module.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const container = useRef<HTMLDivElement | null>(null);
  const startAnimation = gsap.timeline();

  useGSAP(() => {
    const scrollAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '.container',
        start: '5% top',
        end: '45% 10%',
        scrub: 5,
        immediateRender: false,
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: 'power1.in',
        immediateRender: false,
      },
    });

    scrollAnimation.addLabel('parallaxStart');
    scrollAnimation.addLabel('backgroundStart', '+=0.01');

    animationTrigger.forEach(({ target, props, label }) => {
      scrollAnimation.to(target, props, label);
    });

    if (window.scrollY === 0) {
      heroAnimation.forEach(({ target, from, to, offset }) => {
        startAnimation.fromTo(target, from, to, offset || 0);
      });
    } else {
      heroAnimation.forEach(({ target, to }) => {
        gsap.set(target, to);
      });
    }

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="main"
      ref={container}
      className={`${styles.mainTitle} container`}
    >
      <div className={`${styles.titleAni} titleAni`}>
        <div className="mainBg">
          <div className={`${styles.backLight01} light01`}>
            <img src={BackLight01} alt="light01" />
          </div>
          <div className={`${styles.backLight02} light02`}>
            <img src={BackLight02} alt="light02" />
          </div>
          <div className={`${styles.moon} moon`}>
            <img src={Moon} alt="moon" />
          </div>
          <div className={`${styles.river} river`}>
            <img src={River} alt="river" />
          </div>
          <div className={`${styles.mountainBack01} mountainBack01`}>
            <img src={MountainBackground} alt="mountain" />
          </div>
          <div className={`${styles.mountainBack02} mountainBack02`}>
            <img src={MountainBack} alt="mountainBack"></img>
          </div>
          <div className={`${styles.mountainFront01} mountainFront01`}>
            <img src={MountainFront} alt="mountain" />
          </div>
          <div className={`${styles.bgStar} bgStar`}></div>
          <div className={`${styles.bgTop} bgTop`}></div>
          <div className={`${styles.mountainBlack} mountainBlack`}>
            <HeroSvg />
          </div>
        </div>
      </div>
    </section>
  );
}
