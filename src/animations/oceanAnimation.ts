import gsap from 'gsap';

export default function oceanAnimation(targets: {
  bubble: string;
  midBubble: string;
  smallBubble: string;
}) {
  const baseAnimation = {
    backgroundPosition: '0px -800px',
    ease: 'linear',
    repeat: -1,
  };

  const anim1 = gsap.to(targets.bubble, { ...baseAnimation, duration: 30 });
  const anim2 = gsap.to(targets.midBubble, { ...baseAnimation, duration: 45 });
  const anim3 = gsap.to(targets.smallBubble, {
    ...baseAnimation,
    duration: 60,
  });

  return [anim1, anim2, anim3];
}
