import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

import figmaIcon from '@/assets/icons/figma.png';
import githubIcon from '@/assets/icons/github.png';
import notionIcon from '@/assets/icons/notion.png';
import profileIcon from '@/assets/icons/profile_icon.png';

const ICON_IMAGE_MAP: Record<string, string> = {
  github: githubIcon,
  figma: figmaIcon,
  notion: notionIcon,
  link: profileIcon,
};

export default function ImageLinkView({ node }: NodeViewProps) {
  const { href, type } = node.attrs;

  return (
    <NodeViewWrapper
      as="span"
      className="image-link-wrapper"
      contentEditable={false}
    >
      <a
        href={href}
        className="image-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={ICON_IMAGE_MAP[type]} alt="" />
      </a>
    </NodeViewWrapper>
  );
}
