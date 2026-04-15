import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

const ICON_MAP: Record<string, string> = {
  github: '🐙',
  figma: '🎨',
  notion: '📓',
  link: '🔗',
};

export default function IconLinkView({ node }: NodeViewProps) {
  const { href, type } = node.attrs;

  return (
    <NodeViewWrapper as="span" contentEditable={false}>
      <a
        href={href}
        className="icon-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{ICON_MAP[type] ?? '🔗'}</span>
      </a>
    </NodeViewWrapper>
  );
}
