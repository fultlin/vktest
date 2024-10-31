import React from "react";
import { List, Typography } from "antd";
import { IRepo } from "../../stores/ListStore";
import styles from './RepoItem.module.css'

interface RepoItemProps {
  repo: IRepo;
  onEditClick: (repo: IRepo) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEditClick }) => (
  <List.Item onClick={() => onEditClick(repo)} className={styles.item}>
    <Typography.Link href={repo.html_url} target="_blank" className={styles.title}>
      Название: {repo.name}
    </Typography.Link>
    <Typography.Paragraph className={styles.content}>Описание: {repo.description}</Typography.Paragraph>
    <Typography.Paragraph className={styles.content}>Количество звёзд: {repo.stargazers_count} Форки: {repo.forks_count} Обновлено: {repo.updated_at.slice(0,10)} {repo.updated_at.slice(11,19)}</Typography.Paragraph>

  </List.Item>
);

export default RepoItem;
