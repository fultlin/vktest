import { makeAutoObservable } from "mobx";

interface IRepo {
  id: number;
  name: string;
  description: string;
}

class ListStore {
  repos: IRepo[] = [];
  page = 1;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRepos() {
    this.loading = true;
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=stars:>1&sort=stars&page=${this.page}`
      );
      const data = await response.json();

      if (this.repos != data.items) {
          this.repos = [...this.repos, ...data.items];
      }
    //   this.page += 1;
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async editRepo(id: number, data: IRepo) {
    const repo = this.repos.find((repo) => repo.id === id);
  }

  deleteRepo(id: number) {
    this.repos = this.repos.filter((repo) => repo.id !== id);
  }
}

export const listStore = new ListStore();
