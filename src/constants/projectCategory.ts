export const PROJECT_CATEGORY = [
  {
    name: '전체',
    type: 'all',
  },
  {
    name: '퍼블리싱',
    type: '퍼블리싱',
  },
  {
    name: '프론트엔드',
    type: '프론트엔드',
  },
] as const;

export type Category = (typeof PROJECT_CATEGORY)[number]['type'];
