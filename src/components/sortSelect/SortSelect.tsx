import React from "react";
import { Select } from "antd";
import { listStore } from "../../stores/ListStore";
import { observer } from "mobx-react-lite";

const { Option } = Select;
import styles from './SortSelect.module.css'

const SortSelect = observer(() => {
  const handleChange = (value: string) => {
    listStore.setSortOption(value);
  };

  return (
    <Select
      placeholder="Сортировка"
      value={listStore.sortOption}
      onChange={handleChange}
      className={styles.sortselect}
    >
      <Option value="stars" className={styles.option}>По звездам</Option>
      <Option value="forks" className={styles.option}>По форкам</Option>
      <Option value="updated" className={styles.option}>По обновлениям</Option>
      <Option value="help-wanted-issues" className={styles.option}>По запросам помощи</Option>
    </Select>
  );
});

export default SortSelect;
