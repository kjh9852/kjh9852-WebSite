import { Editor } from '@tiptap/core';

import { uploadImage } from '@/api/uploadImage';
import blockQuoteIcon from '@/assets/icons/block-quote.png';
import boldIcon from '@/assets/icons/bold.png';
import centerAlignIcon from '@/assets/icons/center-align.png';
import codeIcon from '@/assets/icons/code.png';
import imageIcon from '@/assets/icons/image.png';
import italicIcon from '@/assets/icons/italic.png';
import justifyAlignIcon from '@/assets/icons/justify-align.png';
import leftAlignIcon from '@/assets/icons/left-align.png';
import rightAlignIcon from '@/assets/icons/right-align.png';
import underLineIcon from '@/assets/icons/underline.png';
import Separator from '@/features/editor/components/separator/Separator';
import HeadingDropdown from '@/features/editor/components/toolbar/HeadingDropdown';
import ListDropDown from '@/features/editor/components/toolbar/ListDropdown';

export default function Toolbar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }

    event.target.value = '';
  };

  return (
    <div className="bubble-menu">
      <HeadingDropdown editor={editor} />
      <ListDropDown editor={editor} />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`toolbar-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
      >
        <img src={blockQuoteIcon} />
      </button>
      <Separator />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        <img src={boldIcon} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar-btn ${
          editor.isActive('italic') ? 'is-active' : ''
        }`}
      >
        <img src={italicIcon} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`toolbar-btn ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
      >
        <img src={codeIcon} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`toolbar-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
      >
        <img src={underLineIcon} />
      </button>
      <Separator />
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
      >
        <img src={leftAlignIcon} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
      >
        <img src={centerAlignIcon} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
      >
        <img src={rightAlignIcon} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`toolbar-btn ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
      >
        <img src={justifyAlignIcon} />
      </button>
      <Separator />
      <button
        type="button"
        className={`toolbar-btn ${editor.isActive('image') ? 'is-active' : ''}`}
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <img src={imageIcon} />
      </button>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    </div>
  );
}
