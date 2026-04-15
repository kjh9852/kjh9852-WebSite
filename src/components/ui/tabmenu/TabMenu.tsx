import clsx from 'clsx';

import styles from './TabMenu.module.scss';

interface TabItem<T> {
  type: T;
  name: string;
}

interface TabMenuProps<T> {
  tabs: readonly TabItem<T>[];
  selectMenu: T;
  setSelectMenu: (tab: T) => void;
}

export default function TabMenu<T extends string>({
  tabs,
  selectMenu,
  setSelectMenu,
}: TabMenuProps<T>) {
  return (
    <ul className={styles.tabMenu} role="tablist">
      {tabs.map((list) => {
        const isActive = selectMenu === list.type;

        return (
          <li
            key={list.type}
            className={clsx(styles.tabItem, isActive && styles.active)}
            role="presentation"
          >
            <button
              onClick={() => setSelectMenu(list.type)}
              className={styles.tabButton}
              role="tab"
              aria-selected={isActive}
            >
              <span className={styles.menuText}>{list.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
