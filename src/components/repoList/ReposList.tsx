import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { IRepo, listStore } from "../../stores/ListStore";
import { Spin, List, Typography, Layout } from "antd";
import RepoItem from "../RepoItem/RepoItem";
import EditRepoDialog from "../editRepoDialog/EditRepoDialog";
import SortSelect from "../sortSelect/SortSelect";
import styles from './RepoList.module.css'

const { Title } = Typography;
const { Content } = Layout;

const ReposList = observer(() => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [currentRepo, setCurrentRepo] = useState<IRepo | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      if (listStore.repos.length === 0 && !listStore.loading) {
        await listStore.fetchRepos();
      }
    };
    loadRepos();
  }, [listStore.sortOption]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !listStore.loading) {
      listStore.fetchRepos();
    }
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "500px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleEditClick = (repo: IRepo) => {
    setCurrentRepo(repo);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = (updatedRepo: IRepo) => {
    listStore.editRepo(updatedRepo.id, updatedRepo);
  };

  const handleDelete = (id: number) => {
    listStore.deleteRepo(id);
  };

  return (
    <Content style={{ padding: '0 50px', maxWidth: 800, margin: '0 auto' }}>
      <Title level={3} style={{ marginTop: 20 }} className={styles.title}>Список репозиториев</Title>

      <SortSelect />

      <List
        itemLayout="vertical"
        size="large"
        dataSource={listStore.repos}
        renderItem={(repo) => <RepoItem key={repo.id} repo={repo} onEditClick={handleEditClick} />}
        style={{ marginTop: 16 }}
      >
        <div ref={observerRef} style={{ height: 20 }} />
      </List>

      {listStore.loading && (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Spin size="large" />
        </div>
      )}

      <EditRepoDialog
        open={open}
        repo={currentRepo}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </Content>
  );
});

export default ReposList;
