import { Editor } from '@tiptap/core';

import downArrow from '@/assets/icons/down-arrow.png';
import headingIcon from '@/assets/icons/heading-default.png';
import heading1 from '@/assets/icons/heading1.png';
import heading2 from '@/assets/icons/heading2.png';
import heading3 from '@/assets/icons/heading3.png';
import heading4 from '@/assets/icons/heading4.png';
import { Dropdown } from '@/components/ui';
import useToggle from '@/hooks/useToggle';

import styles from './ToolbarDropdown.module.scss';

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingValue = `h${HeadingLevel}`;

export default function HeadingDropdown({ editor }: { editor: Editor }) {
  const [modalOpen, toggleModal, setModalOpen] = useToggle(false);

  const handleHeading = (level: HeadingLevel) => {
    if (editor.isActive('heading', { level })) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  function getCurrentHeading(editor: Editor) {
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    if (editor.isActive('heading', { level: 4 })) return 'h4';
    return 'h';
  }

  const HEADING_ICON: Record<HeadingLevel, string> = {
    1: heading1,
    2: heading2,
    3: heading3,
    4: heading4,
  };

  const levels = [1, 2, 3, 4] as const;

  const HEADING_LIST = levels.map((level) => ({
    label: (
      <div className={styles.iconFlex}>
        <img className={styles.headingImg} src={HEADING_ICON[level]} />
        <span>Heading{level}</span>
      </div>
    ),
    value: `h${level}` as HeadingValue,
  }));

  const HEADING_MAP = {
    h: <img className={styles.headingImg} src={headingIcon} />,
    h1: <img className={styles.headingImg} src={heading1} />,
    h2: <img className={styles.headingImg} src={heading2} />,
    h3: <img className={styles.headingImg} src={heading3} />,
    h4: <img className={styles.headingImg} src={heading4} />,
  };

  return (
    <Dropdown<HeadingValue>
      isOpen={modalOpen}
      setOpen={setModalOpen}
      dropdownList={HEADING_LIST}
      positionStyle={{ left: '0px' }}
      onSelect={(value) => {
        if (!value) return;
        const level = Number(value[1]) as HeadingLevel;
        handleHeading(level);
      }}
    >
      <button type="button" className={styles.iconButton} onClick={toggleModal}>
        {HEADING_MAP[getCurrentHeading(editor)]}
        <img className={styles.arrowImg} src={downArrow} />
      </button>
    </Dropdown>
  );
}
