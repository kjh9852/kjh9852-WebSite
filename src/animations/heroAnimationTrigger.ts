const speed = 100;

export const animationTrigger = [
  {
    target: '.bgTop',
    props: {
      y: -25 * speed,
      scale: 1,
    },
    label: 'parallaxStart',
  },
  {
    target: '.bgStar',
    props: {
      y: -50 * speed,
      scale: 1,
    },
    label: 'parallaxStart',
  },
  {
    target: '.mountainBack01',
    props: {
      y: 100 * speed,
      scale: 1,
    },
    label: 'backgroundStart',
    // offset: 0.01,
  },
  {
    target: '.mountainBack02',
    props: {
      y: 30 * speed,
      scale: 1,
    },
    label: 'backgroundStart',
    // offset: 0.01,
  },
  {
    target: '.light01',
    props: {
      y: 150 * speed,
      scale: 1,
    },
    label: 'parallaxStart',
    // offset: 0,
  },
  {
    target: '.light02',
    props: {
      y: 150 * speed,
      scale: 1,
    },
    label: 'parallaxStart',
    // offset: 0,
  },
  {
    target: '.mountainFront01',
    props: {
      y: 100 * speed,
      scale: 0,
      attr: {
        fill: '#8edccd',
      },
    },
    label: 'parallaxStart',
    // offset: 0,
    opacity: 0,
  },
  {
    target: '.river',
    props: {
      y: 30 * speed,
      scale: 1,
    },
    label: 'backgroundStart',
    // offset: 0.01,
  },
  {
    target: '.moon',
    props: {
      y: 100 * speed,
      scale: 0.1,
    },
    label: 'backgroundStart',
    // offset: 0.01,
  },
  {
    target: '.mountainFill',
    props: {
      y: -10 * speed,
      scale: 3,
      transformOrigin: 'center',
    },
    label: 'parallaxStart',
    // offset: 0,
  },
  {
    target: '.mountainFill',
    props: {
      fill: '#8edccd',
      duration: 0.1,
      transformOrigin: 'center',
    },
    label: 'parallaxStart',
    // offset: 0,
  },
  {
    target: '.mountainFill',
    props: {
      autoAlpha: 0,
      duration: 1, // 원하는 페이드아웃 시간
    },
    label: 'parallaxStart',
    // offset: 0, // 이전 타이밍에서 얼마나 기다릴지 (원한다면 조절)
  },
  {
    target: '.titleAni',
    props: {
      autoAlpha: 0,
    },
    label: 'backgroundStart',
    // offset: 0.01,
  },
];
