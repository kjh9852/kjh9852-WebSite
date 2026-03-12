export const heroAnimation = [
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
    target: '.mountainBack01',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'expo.out', duration: 3 },
  },
  {
    target: '.mountainBack02',
    from: { y: 1000, scale: 1 },
    to: { y: 0, scale: 1, ease: 'expo.out', duration: 3 },
    offset: 1,
  },
  {
    target: '.mountainFront01',
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
    target: '.mountainBlack',
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
