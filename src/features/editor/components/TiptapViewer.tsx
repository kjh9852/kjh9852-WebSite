import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { IconLink, ImageLink } from '@/features/editor/extensions';

import styles from './TiptapViewer.module.scss';

export default function TiptapViewer({
  title,
  description,
  actions,
}: {
  title?: string;
  description: string;
  actions?: React.ReactNode;
}) {
  const editor = useEditor({
    extensions: [
      ImageLink,
      IconLink,
      StarterKit.configure({}),
      Image.configure({
        inline: true,
        resize: {
          enabled: true,
          minWidth: 50,
          minHeight: 50,
          alwaysPreserveAspectRatio: true,
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: description,
    editable: false,
  });

  return (
    <div>
      <div className={styles.viewerHeader}>
        <h2 className={styles.title}>{title}</h2>
        {actions && actions}
      </div>
      <div className="view-content">
        <EditorContent className="sheet" editor={editor} />
      </div>
    </div>
  );
}
