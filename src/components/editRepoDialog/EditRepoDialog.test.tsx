import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditRepoDialog from "./EditRepoDialog";
import "@testing-library/jest-dom";

describe("EditRepoDialog компонент", () => {
  const onCloseMock = jest.fn();
  const onSaveMock = jest.fn();
  const onDeleteMock = jest.fn();
  const repo = {
    id: 1,
    name: "Repo 1",
    description: "Description 1",
    html_url: "#",
    updated_at: "2024-10-31T10:46:18.234Z",
    stargazers_count: 10,
    forks_count: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Рендер модального окна с данными репозитория", () => {
    render(
      <EditRepoDialog
        open={true}
        repo={repo}
        onClose={onCloseMock}
        onSave={onSaveMock}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByText("Редактировать репозиторий")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Название")).toHaveValue("Repo 1");
    expect(screen.getByPlaceholderText("Описание")).toHaveValue(
      "Description 1"
    );
  });

  it("Обновление названия и описания", () => {
    render(
      <EditRepoDialog
        open={true}
        repo={repo}
        onClose={onCloseMock}
        onSave={onSaveMock}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Название"), {
      target: { value: "Updated Repo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Описание"), {
      target: { value: "Updated Description" },
    });

    expect(screen.getByPlaceholderText("Название")).toHaveValue("Updated Repo");
    expect(screen.getByPlaceholderText("Описание")).toHaveValue(
      "Updated Description"
    );
  });

  it("Сохранение изменений", () => {
    render(
      <EditRepoDialog
        open={true}
        repo={repo}
        onClose={onCloseMock}
        onSave={onSaveMock}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Название"), {
      target: { value: "Updated Repo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Описание"), {
      target: { value: "Updated Description" },
    });

    fireEvent.click(screen.getByText("Сохранить"));

    expect(onSaveMock).toHaveBeenCalledWith({
      id: 1,
      name: "Updated Repo",
      description: "Updated Description",
      html_url: "#",
      updated_at: expect.any(String),
      stargazers_count: 10,
      forks_count: 3,
    });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("Закрытие модального окна", () => {
    render(
      <EditRepoDialog
        open={true}
        repo={repo}
        onClose={onCloseMock}
        onSave={onSaveMock}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(screen.getByText("Отмена"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("Удаление репозитория", () => {
    render(
      <EditRepoDialog
        open={true}
        repo={repo}
        onClose={onCloseMock}
        onSave={onSaveMock}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(screen.getByText("Удалить"));
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });
});
