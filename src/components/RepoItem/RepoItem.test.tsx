import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RepoItem from "./RepoItem";
import "@testing-library/jest-dom";

describe("RepoItem компонент", () => {
  const repo = {
    id: 1,
    name: "Repo 1",
    description: "Description 1",
    html_url: "#",
    updated_at: "2024-10-31T10:46:18.234Z",
    stargazers_count: 10,
    forks_count: 3,
  };
  const onEditClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Рендер правильных данных репозитория", () => {
    render(<RepoItem repo={repo} onEditClick={onEditClickMock} />);

    expect(screen.getByText("Название: Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Описание: Description 1")).toBeInTheDocument();
  });

  it("Вызывает onEditClick при клике на элемент списка", () => {
    render(<RepoItem repo={repo} onEditClick={onEditClickMock} />);

    fireEvent.click(screen.getByText("Название: Repo 1"));

    expect(onEditClickMock).toHaveBeenCalledTimes(1);
    expect(onEditClickMock).toHaveBeenCalledWith(repo);
  });

  it("Содержит ссылку на html_url", () => {
    render(<RepoItem repo={repo} onEditClick={onEditClickMock} />);

    const link = screen.getByRole("link", { name: "Название: Repo 1" });
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
