import { Node, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import IconLinkView from './IconLinkView';

// [텍스트](URL) 뒤에 공백이 올 때 매칭
const MARKDOWN_LINK_REGEX = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)\s$/;

const ICON_MAP: Record<string, string> = {
  github: '🐙',
  figma: '🎨',
  notion: '📓',
  link: '🔗',
};

export const IconLink = Node.create({
  name: 'iconLink',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      href: { default: null },
      type: { default: 'link' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-icon-link]',
        getAttrs: (dom) => {
          const element = dom as HTMLElement;
          return {
            href: element.getAttribute('href'),
            type: element.getAttribute('type') || 'link',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const icon = ICON_MAP[HTMLAttributes.type] || '🔗';

    return [
      'a',
      {
        ...HTMLAttributes,
        'data-icon-link': 'true',
        type: HTMLAttributes.type,
      },
      icon,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(IconLinkView);
  },

  addInputRules() {
    return [
      new InputRule({
        find: MARKDOWN_LINK_REGEX,
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
