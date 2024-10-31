// @ts-ignore
import React from "react";
import { Modal, Button, Input } from "antd";
import { IRepo } from "../../stores/ListStore";
import { useState, useEffect } from "react";

import styles from './EditRepoDialog.module.css'

interface EditRepoDialogProps {
  open: boolean;
  repo: IRepo | null;
  onClose: () => void;
  onSave: (repo: IRepo) => void;
  onDelete: (id: number) => void;
}

const EditRepoDialog: React.FC<EditRepoDialogProps> = ({
  open,
  repo,
  onClose,
  onSave,
  onDelete,
}) => {
  const [editedName, setEditedName] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");

  useEffect(() => {
    if (repo) {
      setEditedName(repo.name);
      setEditedDescription(repo.description || "");
    }
  }, [repo]);

  const handleSave = () => {
    const updatedAt = new Date().toISOString();
    if (repo) {
      onSave({ ...repo, name: editedName, description: editedDescription, updated_at: updatedAt });
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      title="Редактировать репозиторий"
      onCancel={onClose}
      className={styles.repodialog}
      footer={[
        <Button key="cancel" onClick={onClose} className={styles.button}>
          Отмена
        </Button>,
        <Button key="delete" type="primary" danger onClick={() => onDelete(repo!.id)} className={styles.button}>
          Удалить
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} className={styles.button}>
          Сохранить
        </Button>,
      ]}
    >
      <span>Название</span>
      <Input
        placeholder="Название"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <span>Описание</span>
      <Input.TextArea
        placeholder="Описание"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
    </Modal>
  );
};

export default EditRepoDialog;
