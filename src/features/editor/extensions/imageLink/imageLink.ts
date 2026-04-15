import { Node, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import ImageLinkView from './ImageLinkView';

// [텍스트](URL) 뒤에 공백이 올 때 매칭
const IMAGE_LINK_REGEX =
  /@\[(github|figma|notion|link)\]\((https?:\/\/[^\s)]+)\)\s$/;

// !로 시작하는 정규식은 tiptap의 기본 InputRule이 적용되어 정상적으로 작동을 안하는 문제

export const ImageLink = Node.create({
  name: 'imageLink',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: true,
  draggable: true,
  priority: 1000,

  addAttributes() {
    return {
      href: { default: null },
      type: { default: 'link' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-image-link]',
        getAttrs: (dom) => {
          const element = dom as HTMLElement;
          return {
            href: element.getAttribute('data-href'),
            type: element.getAttribute('data-type') || 'link',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        'data-image-link': 'true',
        'data-href': HTMLAttributes.href,
        'data-type': HTMLAttributes.type,
        class: 'node-imageLink',
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageLinkView);
  },

  addInputRules() {
    return [
      new InputRule({
        find: IMAGE_LINK_REGEX,
        handler: ({ state, range, match }) => {
          console.log(match);
          const { tr } = state;

          const [, typeText, href] = match;
          if (!typeText || !href) return;

          const type = typeText.toLowerCase();

          tr.replaceWith(
            range.from,
            range.to,
            this.type.create({ href, type })
          );

          tr.insertText(' ');
        },
      }),
    ];
  },
});
