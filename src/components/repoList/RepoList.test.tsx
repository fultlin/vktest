import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { listStore } from '../../stores/ListStore';
import ReposList from './ReposList';
import '@testing-library/jest-dom';


jest.mock('../../stores/ListStore', () => ({
  listStore: {
    repos: [],
    loading: false,
    sortOption: 'stars',
    fetchRepos: jest.fn(),
    editRepo: jest.fn(),
    deleteRepo: jest.fn(),
  },
}));

describe('ReposList компонент', () => {
  beforeEach(() => {
    listStore.repos = [
      { id: 1, name: 'Repo 1', description: 'Description 1', html_url: '#', updated_at: "2024-10-31T10:46:18.234Z", stargazers_count: 10, forks_count: 3 },
      { id: 2, name: 'Repo 2', description: 'Description 2', html_url: '#', updated_at: "2024-10-30T10:46:18.234Z", stargazers_count: 10, forks_count: 3 },
    ];
    jest.clearAllMocks();
  });

  it('Рендер списка репозиториев', () => {
    render(<ReposList />);
    expect(screen.getByText('Список репозиториев')).toBeInTheDocument();

    expect(screen.getByText((content) => content.includes('Repo 1'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Repo 2'))).toBeInTheDocument();
  });

  it('Открытие диалогового окна', () => {
    render(<ReposList />);
    fireEvent.click(screen.getByText((content) => content.includes('Repo 1')));
    expect(screen.getByText('Редактировать репозиторий')).toBeInTheDocument();
  });

  it('Запрос на получение репозиторев', () => {
    render(<ReposList />);
    expect(listStore.fetchRepos).toHaveBeenCalledTimes(1);
  });

  it('Вызов функции на удаление', async () => {
    render(<ReposList />);
    fireEvent.click(screen.getByText((content) => content.includes('Repo 1')));
    fireEvent.click(screen.getByText('Удалить'));
    await waitFor(() => expect(listStore.deleteRepo).toHaveBeenCalledWith(1));
  });
});
