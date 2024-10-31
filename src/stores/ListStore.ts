import { makeAutoObservable } from "mobx";

export interface IRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

class ListStore {
  repos: IRepo[] = [];
  page = 1;
  loading = false;
  sortOption: string = "stars"
  
  constructor() {
    makeAutoObservable(this);
  }

  setSortOption(option: string) {
    if (this.sortOption !== option) {
      this.sortOption = option;
      this.page = 1; 
      this.repos = []; 
      this.fetchRepos(); 
    }
  }

  async fetchRepos() {
    this.loading = true;
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=stars:>1&sort=${this.sortOption}&page=${this.page}`
      );
      const data = await response.json();
      if (data.items) {
        this.repos = [...this.repos, ...data.items];
      }
      this.page += 1;
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  editRepo(id: number, updatedRepo: IRepo) {
    const index = this.repos.findIndex((repo) => repo.id === id);
    if (index > -1) {
      this.repos[index] = { ...this.repos[index], ...updatedRepo };
    }
  }

  deleteRepo(id: number) {
    this.repos = this.repos.filter((repo) => repo.id !== id);
  }

  setLoading(value: boolean) {
    this.loading = value
  }
}

export const listStore = new ListStore();
