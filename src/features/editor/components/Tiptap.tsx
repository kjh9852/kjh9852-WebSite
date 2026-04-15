import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import {
  useController,
  type Control,
  type Path,
  type FieldValues,
} from 'react-hook-form';

import { IconLink, ImageLink } from '@/features/editor/extensions';

import Toolbar from './toolbar/Toolbar';
import './tiptap.scss';

interface TiptapEditorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  children?: React.ReactNode;
}

export default function Tiptap<T extends FieldValues>({
  name,
  control,
  children,
}: TiptapEditorProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control });
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
      Placeholder.configure({
        placeholder: '내용을 입력해주세요.',
      }),
    ],
    content: field.value || '',
    onUpdate: ({ editor }) => {
      field.onChange(editor.getHTML());
    },
  });

  return (
    <div className="editor-mode">
      <div className="toolbar">
        <Toolbar editor={editor!} />
      </div>
      <div className="editor-content">
        {children}
        <EditorContent editor={editor} className={clsx('content')} />
        {error && <p className="error-message">{error.message}</p>}
      </div>
    </div>
  );
}
