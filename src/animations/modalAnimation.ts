export const MODAL_ANIMATION = {
  default: {
    default: { ease: 'power1.out' },
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  },
  post: {
    default: { ease: 'back.out(1.7)', duration: 0.7 },
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  },
} as const;
