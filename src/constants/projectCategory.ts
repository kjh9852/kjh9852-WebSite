export const PROJECT_CATEGORY = [
  {
    name: '전체',
    type: 'all',
  },
  {
    name: '개인 프로젝트',
    type: '개인 프로젝트',
  },
  {
    name: '팀 프로젝트',
    type: '팀 프로젝트',
  },
] as const;

export type Category = (typeof PROJECT_CATEGORY)[number]['type'];
