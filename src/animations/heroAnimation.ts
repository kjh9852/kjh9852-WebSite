export const animation = [
  {
    target: '.bgTop',
    from: { y: -2000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'power2.out', duration: 3 },
  },
  {
    target: '.bgStar',
    from: { y: -500, scale: 1 },
    to: { y: 0, scale: 1, ease: 'power2.out', duration: 3 },
  },
  {
    target: '.moutainBack01',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'expo.out', duration: 3 },
  },
  {
    target: '.moutainBack02',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'expo.out', duration: 3 },
    offset: 1,
  },
  {
    target: '.moutainFront01',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'expo.out', duration: 1.7, delay: 1 },
  },
  {
    target: '.moon',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'expo.out', duration: 1.7, delay: 1.5 },
  },
  {
    target: '.river',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'expo.out', duration: 3 },
  },
  {
    target: '.moutainBlack',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'back.out(2)', duration: 1.5 },
  },
  {
    target: '.light01',
    from: { opacity: 0 },
    to: { opacity: 0.08, ease: 'expo.out', duration: 4, delay: 1.7 },
  },
  {
    target: '.light02',
    from: { opacity: 0 },
    to: { opacity: 0.05, ease: 'expo.out', duration: 4, delay: 1.7 },
  },
];

export const slideAnimation = [
  {
    id: '.orange',
    props: {
      y: 45,
      yoyo: true,
      delay: 0,
      repeat: -1,
    },
  },
  {
    id: '.blue',
    props: {
      y: 45,
      yoyo: true,
      delay: 0.3,
      repeat: -1,
    },
  },
  {
    id: '.purple',
    props: {
      y: 45,
      yoyo: true,
      delay: 0.5,
      repeat: -1,
    },
  },
  {
    id: '.yellow',
    props: {
      y: 45,
      yoyo: true,
      delay: 0.7,
      repeat: -1,
    },
  },
  {
    id: '.pink',
    props: {
      y: 45,
      yoyo: true,
      delay: 0.9,
      repeat: -1,
    },
  },
];
