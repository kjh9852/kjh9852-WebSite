import { Editor } from '@tiptap/core';

import bulletList from '@/assets/icons/bullet-list.png';
import downArrow from '@/assets/icons/down-arrow.png';
import orderList from '@/assets/icons/order-list.png';
import { Dropdown } from '@/components/ui';
import useToggle from '@/hooks/useToggle';

import styles from './ToolbarDropdown.module.scss';

type ListType = 'bulletList' | 'orderedList';

export default function ListDropDown({ editor }: { editor: Editor }) {
  const [modalOpen, toggleModal, setModalOpen] = useToggle(false);

  const handleList = (listValue?: ListType) => {
    if (listValue === 'bulletList') {
      editor.chain().focus().toggleBulletList().run();
    } else if (listValue === 'orderedList') {
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  function getCurrentHeading(editor: Editor) {
    if (editor.isActive('bulletList')) return 'bulletList';
    if (editor.isActive('orderedList')) return 'orderedList';
    return 'bulletList';
  }

  const ORDER_LIST = [
    {
      label: (
        <div className={styles.iconFlex}>
          <img className={styles.headingImg} src={bulletList} />
          <span>BulletList</span>
        </div>
      ),
      value: 'bulletList',
    },
    {
      label: (
        <div className={styles.iconFlex}>
          <img className={styles.headingImg} src={orderList} />
          <span>OrderedList</span>
        </div>
      ),
      value: 'orderedList',
    },
  ] as const;

  const LIST_MAP: Record<ListType, React.ReactNode> = {
    bulletList: <img className={styles.headingImg} src={bulletList} />,
    orderedList: <img className={styles.headingImg} src={orderList} />,
  };

  return (
    <Dropdown
      isOpen={modalOpen}
      setOpen={setModalOpen}
      dropdownList={ORDER_LIST}
      positionStyle={{ left: '0px' }}
      onSelect={handleList}
    >
      <button type="button" className={styles.iconButton} onClick={toggleModal}>
        {LIST_MAP[getCurrentHeading(editor)]}
        <img className={styles.arrowImg} src={downArrow} />
      </button>
    </Dropdown>
  );
}
